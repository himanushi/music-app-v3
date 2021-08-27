import {
  modalController, popoverController
} from "@ionic/core";

export const openMenu = (name: string) => async (event: any) => {

  const popover = await popoverController.create({
    component: name,
    event
  });
  return popover.present();

};

export const closeMenu = () => {

  popoverController.dismiss();

};

export const openModal = (name: string) => async () => {

  const modal = await modalController.create({ component: name });
  await modal.present();

};

export const closeModal = () => {

  modalController.dismiss();

};
