import {
  modalController,
  popoverController,
  menuController
} from "@ionic/core";

export const openMenu = (name: string) => async (event: any) => {

  const popover = await popoverController.create({
    component: name,
    event
  });
  await popover.present();

};

export const closeMenu = async () => {

  await popoverController.dismiss();

};

export const openModal =
  (component: HTMLElement, props?: Record<string, any>) => async () => {

    const modal = await modalController.create({
      component,
      componentProps: props
    });
    await modal.present();

  };

export const closeModal = async () => {

  await modalController.dismiss();

};

export const closeSidebar = () => {

  const sidebar = document.querySelector("#sidebar");
  if (sidebar) {

    sidebar.close();

  }

};
