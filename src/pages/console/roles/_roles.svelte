<script lang="ts">
import { goto } from "@roxi/routify";

import { query } from "svelte-apollo";
import type { RoleObject, RolesQuery } from "~/graphql/types";
import { RolesDocument } from "~/graphql/types";

const rolesQuery = query<RolesQuery>(RolesDocument, {
  fetchPolicy: "no-cache",
  variables: {},
});

let roles: RoleObject[];
$: roles = $rolesQuery.data?.roles as RoleObject[];
</script>

{#if roles}
  {#each roles as role}
    <ion-item button on:click={() => $goto(`/console/roles/${role.id}`)}>
      <ion-label>
        {role.description} ( {role.name} )
      </ion-label>
    </ion-item>
  {/each}
{/if}
