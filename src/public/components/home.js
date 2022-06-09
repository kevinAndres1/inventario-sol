'use strict'

//import '../utils/autocomplete.js';
//import '../dialog/details_dialog.js';
//import './dialog/sold_invoice_dialog.js';

// componente clients
let home = Vue.component('home', {

  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-instagram',
    ],
    dialog: false,
    dialogDelete: false,
	dialogDetails: false,
	dialogSold: false,
    page: 1,
    pageCount: 0,
    search: "",
    hidden: false,
    headers: [
		{ text: 'Nombre', value: 'nombre' },
		{ text: 'Unidad de medida', value: 'unidadMedida' },
		{ text: 'Unidad existente', value: 'unidadExistente' },
		{ text: 'Cantidad minima', value: 'cantidadMinima' },
		{ text: 'Costo promedio', value: 'costoPromedio' },
    { text: 'Acciones', value: 'actions', sortable: false },
    ],
    modulos: [],
	  id: null,
    data_pdf: null,
	  pdf: {},
    editedIndex: -1,
    editedItem: {},
	menu: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar Nuevo modulo' : 'Actualizar un modulo';
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created: function() { 
	this.cleanForm();
	this.initialize();
},

  methods: {
    initialize: async function () {
      this.modulos = await execute('mostar-todos-modulos',{});

      if(Math.round ( Object.keys(this.modulos).length / 16) >= 1 )
        this.pageCount =  Math.round ( Object.keys(this.modulos).length / 16);
    },

    editItem: async function(item) {
      this.editedIndex = item.id
      this.editedItem = await execute('mostrar-modulo', this.editedIndex);
      this.dialog = true
    },

    deleteItem: async function(item) {
      this.editedIndex = item.id;
      this.editedItem = await execute('mostrar-modulo', this.editedIndex);

      if(this.editedItem.code == 0){
        alertApp({color:"error", text: this.editedItem, icon: "alert" });
        this.editedItem = {id: '',name: '',lastname: '',cedula: ''};
      }

      this.dialogDelete = true
    },

    deleteItemConfirm: async function() {
      let result = await execute('borrar-modulo', this.editedIndex);


      if(result.code == 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }

      this.closeDelete();
    },

	cleanForm: function() {
		this.editedItem = {
			id: '',
			name: '',
			code: '',
			vendor: '',
			model: '',
			description: '',
			date_purchase: '',
			category: '',
			transport_cost: ''
    };
	},

  generatePDFAll: async function() {
		
		let result = await execute('generate-pdf-modulo', {export_all: 1});

		if(result.code == 1) 
			alertApp({color:"success", text: result, icon: "check" }); 
		else
			alertApp({color:"error", text: result, icon: "alert" }); 

	},


	generatePDF: async function() {

		if( this.select_value == 'codigo'){
			this.pdf.code = true;
		}
		else if ( this.select_value == 'assigned_person'){
			this.pdf.assigned_person = true;
			this.pdf.code = null;
		}

		this.pdf.data = this.data_pdf;
			
		let result = await execute('generate-pdf-modulo', this.pdf);

		if(result.code == 1) 
			alertApp({color:"success", text: result, icon: "check" }); 
		else
			alertApp({color:"error", text: result, icon: "alert" }); 

	},


    close () {
        this.dialog = false;
	      this.cleanForm();
        this.$nextTick(() => {
        this.initialize();
        this.editedIndex = -1;
      })
    },

    closeDelete () {
        this.dialogDelete = false;
        this.$nextTick(() => {
        this.initialize();
        this.cleanForm();
        this.editedIndex = -1;
      })
    },

    save: async function() {
      let result = null;
      
      if (this.editedIndex > -1) {
        result = await execute('actualizar-modulo', this.editedItem);
      } else {
        result = await execute('crear-modulos', this.editedItem);
      }

      if(result.code === 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
        this.close();
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }
       
    },
  },


	template: `
<v-container>  	
    <v-data-table
    :headers="headers"
    :items="modulos"
    sort-by="calories"
    class="elevation-0"
    hide-default-footer
    @page-count="pageCount = $event"
    :page.sync="page"
    :items-per-page="16"
    :search="search"
>
  <template v-slot:top>
    <v-toolbar flat >
        <v-toolbar-title>Modulos</v-toolbar-title>
    <v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>

    <v-scroll-x-reverse-transition>
    <v-text-field
      v-show="hidden"
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar"
      single-line
      hide-details
    ></v-text-field>
    </v-scroll-x-reverse-transition>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px" >
      <template v-slot:activator="{ on, attrs }">

          
        <v-btn
          color="primary"
          icon
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-plus </v-icon>
        </v-btn> 

        <v-btn
          color="primary"
          icon
          class="mb-2"
          v-bind="attrs"
          @click="initialize"
        >
          <v-icon> mdi-reload </v-icon>
        </v-btn> 
          

        
        <v-btn color="primary" icon	class="mb-2" v-bind="attrs" @click="hidden =!hidden">
        <v-icon> mdi-magnify </v-icon>
      </v-btn> 

      
      <v-btn icon class="mb-2" v-bind="attrs" @click="generatePDFAll">
        <v-icon color="red"> mdi-file </v-icon>
      </v-btn>
      </template>
      
           <v-card>
      
         <v-card-title>
         <span class="text-h5">{{ formTitle }}</span>
         <v-spacer></v-spacer>
         <v-btn color="red darken-1" class="mr-n4" text @click="close" > <v-icon>mdi-close-thick</v-icon> </v-btn>
        </v-card-title>
        <v-divider></v-divider>

              <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field 
                v-model="editedItem.nombre" 
                label="Nombre"
                prepend-icon="mdi-barcode"
                ></v-text-field>
              </v-col>

              <v-col cols="6" >
                <v-text-field 
                v-model="editedItem.unidadMedida" 
                label="Unidad medida"
                prepend-icon="mdi-microsoft-azure"
                ></v-text-field>
              </v-col>

              <v-col cols="6" >
                <v-text-field
                  v-model="editedItem.unidadExistente"
                  label="Unidad existente"
                  prepend-icon="mdi-call-made"
                ></v-text-field>
              </v-col>

              <v-col cols="6" >
                <v-text-field
                  v-model="editedItem.cantidadMinima"
                  label="Cantidad minima"
                  prepend-icon="mdi-call-received"
                ></v-text-field>
              </v-col>

              <v-col cols="6" >
              <v-text-field
                v-model="editedItem.costoPromedio"
                label="Costo promedio"
                prepend-icon="mdi-scale-unbalanced"
              ></v-text-field>
            </v-col>

              <v-col cols="6" >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="editedItem.codigo"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                    > Cancel </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(editedItem.codigo)"
                    > OK </v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>

            </v-row>
          </v-container>
              </v-card-text>


  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="success"
      text
      @click="save"
    >
      Guardar
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
<v-dialog v-model="dialogDelete" max-width="600px">
<v-card>
  <v-card-title class="text-h5">Estas seguro que deseas eliminar este producto?</v-card-title>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="error" text @click="closeDelete">Cancelar</v-btn>
    <v-btn color="success" text @click="deleteItemConfirm">Confirmar</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
</v-card>
</v-dialog>
</v-toolbar>
</template>

<template v-slot:item.total="{item}">
{{formatMoney(item.total)}}
</template>

<template v-slot:item.actions="{ item }">

<v-icon
dense
class="mr-2"
@click="editItem(item)"
color="primary"
>
mdi-pencil
</v-icon>

<v-icon
dense
class="mr-2"
@click="openDialog(item)"
color="primary"
>
mdi-clipboard-list-outline
</v-icon>

<v-icon
dense
@click="deleteItem(item)"
color="error"
>
mdi-delete
</v-icon>
</template>

</v-data-table>
<div class="text-center pt-2">
<v-pagination
v-model="page"
:length="pageCount"
></v-pagination>
</div>






  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        raesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>&copy Kevin Rojas | R.desing</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-container>
  `
});

export default home;
