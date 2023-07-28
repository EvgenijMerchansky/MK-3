interface HeroChoiceParams {
  leftSibling: boolean,
  rightSibling: boolean,
  row: number,
  placeInRow: number
}

export interface Hero {
  id: number,
  name: string,
  icon: string,
  previewIcon: string,
  sound?: string,
  gif?: string,
  choiceParams?: HeroChoiceParams
}
