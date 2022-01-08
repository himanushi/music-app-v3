<script lang="ts">
import { ApolloError } from "@apollo/client";
import type { CheckboxChangeEventDetail } from "@ionic/core";
import { mutation, query } from "svelte-apollo";
import type {
  ActionEnum,
  AllActionsQuery,
  RoleObject,
  RolesQuery,
  UpdateRoleMutationVariables,
  UpdateRolePayload,
} from "~/graphql/types";
import {
  RolesDocument,
  AllActionsDocument,
  UpdateRoleDocument,
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openLoading, openToast } from "~/lib/ionic";

export let id = "";

const rolesQuery = query<RolesQuery>(RolesDocument, {
  fetchPolicy: "no-cache",
});

const actionsQuery = query<AllActionsQuery>(AllActionsDocument, {
  fetchPolicy: "no-cache",
});

const updateRole =
  mutation<UpdateRolePayload, UpdateRoleMutationVariables>(UpdateRoleDocument);

let actions: ActionEnum[] | undefined;
$: actions = $actionsQuery.data?.allActions as ActionEnum[] | undefined;

let role: RoleObject | undefined;
$: role = $rolesQuery.data?.roles?.filter((rol) => rol.id === id)[0];

let checkedActions: ActionEnum[] = [];
$: if (role && role.allowedActions.length > 0) {
  checkedActions = [...role.allowedActions];
}

const onChecked =
  (action: ActionEnum) => (event: CustomEvent<CheckboxChangeEventDetail<any>>) => {
    if (event.detail.checked) {
      checkedActions = [...checkedActions, action];
    } else {
      checkedActions = checkedActions.filter(
        (checkedAction) => checkedAction !== action
      );
    }
  };

const onSave = () => {
  (async () => {
    try {
      await openLoading();

      await updateRole({
        variables: { input: { allowedActions: checkedActions,
          roleId: id } },
      });

      openToast({
        color: "light-green",
        duration: 5000,
        message: "更新しました",
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const messages = errorMessages(error);

        openToast({
          color: "light-red",
          message: `エラーが発生しました。[${messages._?.join(", ")}]`,
        });
      }
    } finally {
      await closeLoading();
    }
  })();
};
</script>

{#if role && actions}
  <ion-item>
    <ion-label>
      {role.description} ( {role.name} )
    </ion-label>
  </ion-item>
  {#each actions as action}
    <ion-item>
      <ion-checkbox
        slot="start"
        color="green"
        checked={role.allowedActions.indexOf(action) !== -1}
        on:ionChange={onChecked(action)}
      />
      <ion-label>
        {action}
      </ion-label>
    </ion-item>
  {/each}
  <ion-item button>
    <ion-icon slot="start" color="blue" name="cloud-upload-outline" />
    <ion-label on:click={onSave}>保存</ion-label>
  </ion-item>
{/if}
