export interface BibleVerse {
  id: string
  content: string
  reference: string
}

export const bibleVerses: BibleVerse[] = [
  {
    id: "verse-1",
    content:
      "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point mais qu'il ait la vie éternelle.",
    reference: "Jean 3:16",
  },
  {
    id: "verse-2",
    content:
      "L'Éternel est mon berger : je ne manquerai de rien.",
    reference: "Psaume 23:1",
  },
  {
    id: "verse-3",
    content:
      "Je puis tout par celui qui me fortifie.",
    reference: "Philippiens 4:13",
  },
]
