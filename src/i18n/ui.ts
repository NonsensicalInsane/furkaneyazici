// Interface text around a blog post (labels, buttons, headings the site adds),
// in the post's language (`lang` in its front matter). Languages missing here
// fall back to English; to add one, copy `en` and translate it.
//
// Used by the post's components (through Astro.locals.postLang), the markdown
// plugins ("Figure 2", "Notes", "References") and, for the few texts the
// browser writes, a JSON block on the page (clientStrings below).

type Kind = 'figure' | 'definition' | 'theorem' | 'lemma';

const en = {
  minRead: (n: number) => `${n} min read`,
  alsoAvailableIn: 'Also available in:',
  draftNotice: 'Draft: only visible in development, not published.',
  abstract: 'Abstract',

  textSize: 'Text size',
  readingSettings: 'Reading settings',
  reset: 'Reset',
  smallerText: 'Smaller text',
  largerText: 'Larger text',
  savedForEveryPost: 'Saved for every post on this device.',

  /** Text before and after the series name: "Part 1 of 2 in <name>" */
  seriesPart: (part: number, of: number): [string, string] => [`Part ${part} of ${of} in `, ''],
  previousPart: 'Previous part',
  nextPart: 'Next part',
  otherParts: (series: string) => `${series}: other parts`,

  level: 'Level',
  levels: { intro: 'Introductory', intermediate: 'Intermediate', advanced: 'Advanced' },
  beforeYouRead: 'Before you read',

  onThisPage: 'On this page',
  tableOfContents: 'Table of contents',

  /** "Figure 2", "Theorem 1": captions, statement boxes and <Ref> links */
  numbered: (kind: Kind, n: number | string) =>
    `${{ figure: 'Figure', definition: 'Definition', theorem: 'Theorem', lemma: 'Lemma' }[kind]} ${n}`,
  statementName: { definition: 'Definition', theorem: 'Theorem', lemma: 'Lemma' },
  /** After "Figure 2" / "Theorem 1 (Name)" before the text: "." in English, nothing in Japanese */
  labelEnd: '.',
  proof: 'Proof',
  endOfProof: 'End of proof',
  enlargeFigure: (n?: string) => (n ? `Enlarge figure ${n}` : 'Enlarge figure'),
  loadingChart: 'Loading interactive chart…',
  chartNeedsJs: 'Interactive chart (needs JavaScript)',
  callout: { note: 'Note', tip: 'Tip', warning: 'Warning', important: 'Important' },

  notes: 'Notes',
  backToText: 'Back to text',
  references: 'References',

  share: 'Share',
  shareOn: (site: string) => `Share on ${site}`,
  copyLink: 'Copy link',
  shareByEmail: 'Share via email',

  newsletter: 'Newsletter',
  newsletterHeading: 'Get new posts by email',
  newsletterText: 'An email when a new post is out, nothing else. Unsubscribe any time.',
  emailAddress: 'Email address',
  emailPlaceholder: 'you@example.com',
  subscribe: 'Subscribe',
  /** Around the RSS link: [before, link text, after] */
  newsletterFeed: ['Sent with Buttondown. Prefer a feed reader? Follow the ', 'RSS feed', '.'] as [string, string, string],

  reading: 'Reading',
  minLeft: (n: number) => `${n} min left`,
  backToTop: 'Back to top',
  backToBlog: 'Back to Blog',

  readMore: 'Read more',
  latest: 'Latest',
  draft: 'Draft',
  formatDate: (date: Date) =>
    new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date),

  keepReading: 'Keep reading',
  relatedPosts: 'Related posts',
  viewAllPosts: 'View all posts',

  /** Written by scripts in the browser; {n} is filled in there */
  client: {
    minLeft: '{n} min left',
    done: 'Done!',
    copyCode: 'Copy code',
    linkCopied: 'Link copied to clipboard!',
    linkCopyFailed: 'Failed to copy link',
    enlargedFigure: 'Enlarged figure',
    close: 'Close',
    chartFailed: 'The interactive chart could not be loaded.',
    license: 'attribution required, non-commercial, no derivatives',
  },
};

export type UiStrings = typeof en;

const tr: UiStrings = {
  minRead: (n) => `${n} dk okuma`,
  alsoAvailableIn: 'Diğer dillerde:',
  draftNotice: 'Taslak: yalnızca geliştirme ortamında görünür, yayında değil.',
  abstract: 'Özet',

  textSize: 'Yazı boyutu',
  readingSettings: 'Okuma ayarları',
  reset: 'Sıfırla',
  smallerText: 'Yazıyı küçült',
  largerText: 'Yazıyı büyüt',
  savedForEveryPost: 'Bu cihazdaki bütün yazılar için kaydedilir.',

  seriesPart: (part, of) => ['', ` serisi · Bölüm ${part}/${of}`],
  previousPart: 'Önceki bölüm',
  nextPart: 'Sonraki bölüm',
  otherParts: (series) => `${series}: diğer bölümler`,

  level: 'Seviye',
  levels: { intro: 'Giriş', intermediate: 'Orta', advanced: 'İleri' },
  beforeYouRead: 'Okumadan önce',

  onThisPage: 'Bu sayfada',
  tableOfContents: 'İçindekiler',

  numbered: (kind, n) => `${{ figure: 'Şekil', definition: 'Tanım', theorem: 'Teorem', lemma: 'Lemma' }[kind]} ${n}`,
  statementName: { definition: 'Tanım', theorem: 'Teorem', lemma: 'Lemma' },
  labelEnd: '.',
  proof: 'İspat',
  endOfProof: 'İspatın sonu',
  enlargeFigure: (n) => (n ? `Büyüt: Şekil ${n}` : 'Şekli büyüt'),
  loadingChart: 'Etkileşimli grafik yükleniyor…',
  chartNeedsJs: 'Etkileşimli grafik (JavaScript gerekir)',
  callout: { note: 'Not', tip: 'İpucu', warning: 'Uyarı', important: 'Önemli' },

  notes: 'Notlar',
  backToText: 'Metne dön',
  references: 'Kaynaklar',

  share: 'Paylaş',
  shareOn: (site) => `Paylaş: ${site}`,
  copyLink: 'Bağlantıyı kopyala',
  shareByEmail: 'E-postayla paylaş',

  newsletter: 'Bülten',
  newsletterHeading: 'Yeni yazılar e-postana gelsin',
  newsletterText: 'Yalnızca yeni bir yazı çıktığında bir e-posta. İstediğin zaman abonelikten çıkabilirsin.',
  emailAddress: 'E-posta adresi',
  emailPlaceholder: 'sen@ornek.com',
  subscribe: 'Abone ol',
  newsletterFeed: ['Buttondown ile gönderilir. Akış okuyucusu mu kullanıyorsun? ', 'RSS akışını', ' takip et.'],

  reading: 'Okunuyor',
  minLeft: (n) => `${n} dk kaldı`,
  backToTop: 'Başa dön',
  backToBlog: 'Bloga dön',

  readMore: 'Devamını oku',
  latest: 'En yeni',
  draft: 'Taslak',
  formatDate: (date) =>
    new Intl.DateTimeFormat('tr', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date),

  keepReading: 'Okumaya devam',
  relatedPosts: 'İlgili yazılar',
  viewAllPosts: 'Tüm yazılar',

  client: {
    minLeft: '{n} dk kaldı',
    done: 'Bitti!',
    copyCode: 'Kodu kopyala',
    linkCopied: 'Bağlantı kopyalandı!',
    linkCopyFailed: 'Bağlantı kopyalanamadı',
    enlargedFigure: 'Büyütülmüş şekil',
    close: 'Kapat',
    chartFailed: 'Etkileşimli grafik yüklenemedi.',
    license: 'atıf zorunlu, ticari olmayan, türetilemez',
  },
};

const ja: UiStrings = {
  minRead: (n) => `${n}分で読めます`,
  alsoAvailableIn: 'ほかの言語:',
  draftNotice: '下書き：開発環境でのみ表示され、公開されていません。',
  abstract: '概要',

  textSize: '文字サイズ',
  readingSettings: '表示設定',
  reset: 'リセット',
  smallerText: '文字を小さく',
  largerText: '文字を大きく',
  savedForEveryPost: 'この端末のすべての記事に適用されます。',

  seriesPart: (part, of) => ['', `（第${part}回／全${of}回）`],
  previousPart: '前の回',
  nextPart: '次の回',
  otherParts: (series) => `${series}：ほかの回`,

  level: 'レベル',
  levels: { intro: '入門', intermediate: '中級', advanced: '上級' },
  beforeYouRead: '前提知識',

  onThisPage: '目次',
  tableOfContents: '目次',

  numbered: (kind, n) => `${{ figure: '図', definition: '定義', theorem: '定理', lemma: '補題' }[kind]}${n}`,
  statementName: { definition: '定義', theorem: '定理', lemma: '補題' },
  labelEnd: '',
  proof: '証明',
  endOfProof: '証明終わり',
  enlargeFigure: (n) => (n ? `図${n}を拡大` : '図を拡大'),
  loadingChart: 'インタラクティブなグラフを読み込み中…',
  chartNeedsJs: 'インタラクティブなグラフ（JavaScript が必要です）',
  callout: { note: 'メモ', tip: 'ヒント', warning: '注意', important: '重要' },

  notes: '注',
  backToText: '本文に戻る',
  references: '参考文献',

  share: '共有',
  shareOn: (site) => `${site}で共有`,
  copyLink: 'リンクをコピー',
  shareByEmail: 'メールで共有',

  newsletter: 'ニュースレター',
  newsletterHeading: '新しい記事をメールで受け取る',
  newsletterText: '新しい記事が公開されたときだけメールが届きます。いつでも配信を停止できます。',
  emailAddress: 'メールアドレス',
  emailPlaceholder: 'you@example.com',
  subscribe: '登録する',
  newsletterFeed: ['Buttondown で配信しています。フィードリーダーをお使いなら', 'RSS フィード', 'もどうぞ。'],

  reading: '読書中',
  minLeft: (n) => `残り${n}分`,
  backToTop: 'ページの先頭へ',
  backToBlog: 'ブログに戻る',

  readMore: '続きを読む',
  latest: '最新',
  draft: '下書き',
  formatDate: (date) =>
    new Intl.DateTimeFormat('ja', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date),

  keepReading: 'あわせて読みたい',
  relatedPosts: '関連記事',
  viewAllPosts: 'すべての記事を見る',

  client: {
    minLeft: '残り{n}分',
    done: '読了！',
    copyCode: 'コードをコピー',
    linkCopied: 'リンクをコピーしました',
    linkCopyFailed: 'リンクをコピーできませんでした',
    enlargedFigure: '拡大した図',
    close: '閉じる',
    chartFailed: 'インタラクティブなグラフを読み込めませんでした。',
    license: '出典の明記が必要・非営利・改変禁止',
  },
};

const STRINGS: Record<string, UiStrings> = { en, tr, ja };

/** The interface text for a language code ("tr", "ja-JP"…), English when there's none */
export const ui = (lang?: string): UiStrings => STRINGS[(lang || 'en').split('-')[0].toLowerCase()] ?? en;
