export const popup = (name: string) => (event: any) => {

  const popover = Object.assign(document.createElement("ion-popover"), {
    component: name,
    event,
    translucent: true
  });
  document.body.appendChild(popover);
  return popover.present();

};
