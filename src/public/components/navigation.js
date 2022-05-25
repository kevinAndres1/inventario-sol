'use strict'

// componente home
let navigation = Vue.component('navigation', {

    data: function() {
        return {
        }
    },

    methods: {

        toHome: function() { this.$router.push('/'); },
        acidos: function() {this.$router.push('/acidos'); },
        empleados: function() {this.$router.push('/empleados'); },

    },


	template: `
    <v-navigation-drawer 
        width="200"
        app
        permanent 
        color="#263043"
        
    >

    <v-list class="mt-4" nav>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">

        <v-list-item 
            link
            v-bind="attrs"
            v-on="on"
        >
            <v-list-item-icon @click="toHome">
                <v-icon color="white">mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title class="text-body-1" style="color: white;">Dashboard</v-list-item-title>
        </v-list-item-content>
    </v-list-item>

      </template>
      <span>Dashboard</span>
    </v-tooltip>

    <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">

      <v-list-item 
          link
          v-bind="attrs"
          v-on="on"
      >
          <v-list-item-icon>
              <v-icon color="white">mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
          <v-list-item-title  @click="empleados" class="text-body-1" style="color: white;">Empleados</v-list-item-title>
      </v-list-item-content>
  </v-list-item>

    </template>
    <span>Empleados</span>
  </v-tooltip>

  
  <v-tooltip bottom>
  <template v-slot:activator="{ on, attrs }">

    <v-list-item 
        link
        v-bind="attrs"
        v-on="on"
    >
        <v-list-item-icon >
            <v-icon color="white">mdi-account-hard-hat-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content >
        <v-list-item-title class="text-body-1" style="color: white;">Equipos</v-list-item-title>
    </v-list-item-content>
</v-list-item>

  </template>
  <span>Equipos de seguridad</span>
  </v-tooltip>


  <v-tooltip bottom>
  <template v-slot:activator="{ on, attrs }">

    <v-list-item 
        link
        v-bind="attrs"
        v-on="on"
    >
        <v-list-item-icon >
            <v-icon color="white">mdi-biohazard</v-icon>
        </v-list-item-icon>

        <v-list-item-content >
        <v-list-item-title class="text-body-1" style="color: white;" @click="acidos">Acidos</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </template>
  <span>Acidos</span>
</v-tooltip>


<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon>
          <v-icon color="white">mdi-microsoft-azure</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Laminas</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Laminas</span>
</v-tooltip>


<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon >
          <v-icon color="white">mdi-brush-variant</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Pintura</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Pintura</span>
</v-tooltip>


<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon >
          <v-icon color="white">mdi-layers-edit</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Papeleria</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Papeleria</span>
</v-tooltip>


<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon>
          <v-icon color="white">mdi-flask</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Productos</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Productos de limpieza</span>
</v-tooltip>


<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon >
          <v-icon color="white">mdi-clipboard-text</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Otros</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Otros suministros</span>
</v-tooltip>

<v-tooltip bottom>
<template v-slot:activator="{ on, attrs }">

  <v-list-item 
      link
      v-bind="attrs"
      v-on="on"
  >
      <v-list-item-icon >
          <v-icon color="white">mdi-clipboard-text-clock</v-icon>
      </v-list-item-icon>

      <v-list-item-content >
      <v-list-item-title class="text-body-1" style="color: white;">Historial</v-list-item-title>
  </v-list-item-content>
</v-list-item>

</template>
<span>Historial de Inventario</span>
</v-tooltip>
    </v-list>

  </v-navigation-drawer>

  `
});

export default navigation;
