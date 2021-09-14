interface Element {
  content: string;
  close: (option?: any) => void;
  getScrollElement(): Promise<HTMLElement>;
  present: () => void;
  dismiss: () => void;
  select: (tabName: string) => void;
  cssClass: string;
}

interface EventTarget {
  value: any;
  checked: boolean;
}
