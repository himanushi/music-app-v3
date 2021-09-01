interface Element {
  content: string;
  close: (option?: any) => void;
  getScrollElement(): Promise<HTMLElement>;
  present: () => void;
  dismiss: () => void;
  cssClass: string;
}

interface EventTarget {
  value: any;
  checked: boolean;
}
