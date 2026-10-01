// Avisa o Bing (e os buscadores do IndexNow) das URLs do sitemap publicado. A chave é pública por
// definição: o arquivo public/<chave>.txt prova que o site é nosso. O Google não usa IndexNow.
const HOST = 'dracarolinamergulhao.com.br'
const KEY = '8da6c237abbe97528ac5fa31dbfa77f5'

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) throw new Error('Nenhuma URL no sitemap publicado')

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow: ${urlList.length} URLs, resposta ${res.status}`)
if (!res.ok) throw new Error(`IndexNow recusou: ${res.status}`)
