import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY || '',
  baseURL: process.env.AI_API_KEY?.startsWith('gsk_') 
    ? 'https://api.groq.com/openai/v1' 
    : undefined,
})

export async function POST(req: Request) {
  try {
    const { jobDescription, userResume } = await req.json()

    if (!jobDescription || !userResume) {
      return NextResponse.json({ error: 'Job description and resume are required.' }, { status: 400 })
    }

    const isGroq = process.env.AI_API_KEY?.startsWith('gsk_')
    const modelName = isGroq ? 'openai/gpt-oss-20b' : 'gpt-4o-mini'

    const prompt = `
      You are Vektor, an expert AI Career Coach, Resume Tailorer, and Interview Strategist.
      Analyze the Job Description against the Candidate's Resume/Profile.

      Job Description:
      "${jobDescription}"

      Candidate Resume / Profile:
      "${userResume}"

      Respond strictly in valid JSON format using this exact schema:
      {
        "matchScore": number (0-100),
        "matchingSkills": [string array],
        "missingSkills": [string array],
        "overallAdvice": "string",
        "tailoredCvBullets": [
          "3 strong, action-oriented resume bullet points tailored specifically to match key requirements in this job description using STAR method"
        ],
        "interviewPrep": [
          {
            "question": "Likely technical or behavioral interview question for this role",
            "type": "Technical" or "Behavioral",
            "answerTip": "How the candidate should frame their answer based on their profile"
          }
        ]
      }
    `

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: 'You are a JSON-only career assistant. Output strictly valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    })

    const resultText = response.choices[0]?.message?.content || '{}'
    const resultJson = JSON.parse(resultText)

    return NextResponse.json(resultJson)
  } catch (error: any) {
    console.error('AI Analysis Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to analyze' }, { status: 500 })
  }
}