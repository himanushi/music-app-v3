interface Event {
  waitUntil: any;
  request: any;
  respondWith: any;
}

interface EventTarget {
  disabled: boolean;
  complete: Function;
}
