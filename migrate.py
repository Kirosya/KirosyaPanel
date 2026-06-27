import re
import os

html_file = 'index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head and body
head_match = re.search(r'<head>(.*?)</head>', html, re.DOTALL | re.IGNORECASE)
body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL | re.IGNORECASE)
body_tag_match = re.search(r'<body([^>]*)>', html, re.IGNORECASE)

head_content = head_match.group(1) if head_match else ''
body_content = body_match.group(1) if body_match else ''
body_attrs = body_tag_match.group(1) if body_tag_match else ''

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', head_content, re.DOTALL | re.IGNORECASE)
os.makedirs('public', exist_ok=True)
if style_match:
    with open('public/global.css', 'w', encoding='utf-8') as f:
        f.write(style_match.group(1))

# Extract scripts from body
scripts = []
def script_repl(m):
    # Only capture content of scripts without src
    if 'src=' not in m.group(0):
        inner = re.search(r'> (.*?) </script>', m.group(0).replace('\n', ' '), re.DOTALL)
        if inner:
            # wait, safer way:
            inner2 = re.search(r'<script[^>]*>(.*?)</script>', m.group(0), re.DOTALL | re.IGNORECASE)
            if inner2:
                scripts.append(inner2.group(1))
    return ''

body_content = re.sub(r'<script.*?>.*?</script>', script_repl, body_content, flags=re.DOTALL | re.IGNORECASE)

with open('public/main.js', 'w', encoding='utf-8') as f:
    f.write("\n".join(scripts))

layout_tsx = f"""
export default function RootLayout({{ children }}: {{ children: React.ReactNode }}) {{
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SB Aspava | Efsane Lezzetler</title>
        <meta name="description" content="Ankara Türkkonut'ta odun ateşinde efsane lezzetler. SB Aspava ile nefis kebaplar, pideler ve lahmacunlar için hemen sipariş verin." />
        <meta name="keywords" content="SB Aspava, Aspava, Ankara Aspava, Türkkonut Aspava, Ankara kebap, Ankara pide, lahmacun, odun ateşi, yemek siparişi, yemeksepeti, trendyol, ubereats, menu, menü" />
        <meta name="author" content="SB Aspava" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="SB Aspava | Efsane Lezzetler" />
        <meta property="og:description" content="Ankara Türkkonut'ta odun ateşinde efsane lezzetler. SB Aspava ile nefis kebaplar, pideler ve lahmacunlar için hemen sipariş verin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sbaspava.com" />
        <meta property="og:image" content="/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SB Aspava | Efsane Lezzetler" />
        <meta name="twitter:description" content="Ankara Türkkonut'ta odun ateşinde efsane lezzetler. SB Aspava ile nefis kebaplar, pideler ve lahmacunlar için hemen sipariş verin." />
        <link rel="canonical" href="https://sbaspava.com" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=3" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{{{__html: `
          tailwind.config = {{
              theme: {{
                  extend: {{
                      colors: {{
                          brand: {{
                              red: '#b91c1c',
                              light: '#fffbf0',
                              gold: '#f59e0b',
                              dark: '#7f1d1d'
                          }}
                      }},
                      fontFamily: {{
                          sans: ['Overpass', 'sans-serif'],
                          serif: ['Overpass', 'sans-serif'],
                          logo: ['Chewy', 'cursive'],
                      }}
                  }}
              }}
          }}
        `}}}} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Chewy&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body {body_attrs.replace('class=', 'className=').strip()}>
        {{children}}
        <script src="/main.js"></script>
      </body>
    </html>
  );
}}
"""

page_tsx = f"""
'use client';

export default function Page() {{
  return (
    <div dangerouslySetInnerHTML={{{{__html: `{body_content.replace('`', '\\`').replace('$', '\\$')}`}}}} />
  );
}}
"""

os.makedirs('app', exist_ok=True)
with open('app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout_tsx)

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_tsx)

print("Migration script completed.")
