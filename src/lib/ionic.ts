export const openMenu = (name: string) => (event: any) => {

  const popover = Object.assign(document.createElement("ion-popover"), {
    component: name,
    event,
    translucent: true
  });
  document.body.appendChild(popover);
  return popover.present();

};

export const closeMenu = () => {

  const modalElement = document.createElement("ion-popover");
  if (modalElement) {

    modalElement.dismiss();

  }

};

export const openModal = (name: string) => () => {

  const modalElement = document.createElement("ion-modal");
  modalElement.component = name;
  document.body.appendChild(modalElement);
  return modalElement.present();

};

export const closeModal = () => {

  const modalElement = document.createElement("ion-modal");
  if (modalElement) {

    modalElement.dismiss();

  }

};
