<script lang="ts">
let text = "Hello World!!";

// $: { } ← のことを reactive declarations と呼ぶ
// reactive declarations に変数 text が存在しないため1度のみ実行
$: {
  // eslint-disable-next-line no-console
  console.log("一度の実行");
}

// reactive declarations に変数 text が存在するため text が変更されるたび実行
$: {
  // eslint-disable-next-line no-console
  console.log(`text(${text}) が変更するたびに実行`);
}

// reactive declarations には条件を追加することが可能
$: if (text.length > 30) {
  // eslint-disable-next-line no-console
  console.log("30文字以上になりました");
}

const presentAlert = () => {
  const alert = document.createElement("ion-alert");
  alert.cssClass = "my-custom-class";
  alert.header = "Alert";
  alert.subHeader = "Subtitle";
  alert.message = "This is an alert message.";
  alert.buttons = ["OK"];

  document.body.appendChild(alert);
  return alert.present();
};
</script>

<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button />
    </ion-buttons>
    <ion-title>My Navigation Bar</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-title>Subheader</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-text>
    {text}
  </ion-text>
  <input bind:value={text} />
  <button on:click={presentAlert}>About2 ページへ</button>
</ion-content>
