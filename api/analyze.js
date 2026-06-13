export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idea } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `你是一個創業顧問，請用繁體中文分析這個創業想法：${idea}
        
請輸出以下格式：
1. 可行性評分（總分/100）
2. 目標用戶
3. 競爭對手
4. 最大風險
5. 賺錢模式
6. MVP建議
7. 第一週行動計畫`
      }]
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.content[0].text });
}
