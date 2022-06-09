'use strict'

let papelerias = Vue.component('papelerias', {

  data: () => ({
    page: 1,
    pageCount: 0,
    search: "",
    hidden: false,
    headers: [
    
		{ text: 'Codigo', value: 'codigo' },
		{ text: 'Descripcion', value: 'descripcion' },
		{ text: 'Entrada en kilos', value: 'entradaKilos' },
		{ text: 'salida en kilos', value: 'salidaKilos' },
		{ text: 'Cantidad existente', value: 'cantidadExistente' },
		{ text: 'Acciones', value: 'actions', sortable: false }
    ],
    papelerias: [],
	codigo: null,
    editedIndex: " ",
    editedItem: {},
	menu: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === " " ? 'Registrar Nueva Papeleria' : 'Actualizar una Papeleria';
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
      this.papelerias = await execute('muestra-papelerias');

      if(Math.round ( Object.keys(this.papelerias).length / 16) >= 1 )
        this.pageCount =  Math.round ( Object.keys(this.papelerias).length / 16);
    },

    editItem: async function(item) {
      this.editedIndex = item.codigo
      this.editedItem = await execute('mostrar-papeleria', this.editedIndex);
      this.dialog = true
    },

    deleteItem: async function(item) {
      this.editedIndex = item.codigo;
      this.editedItem = await execute('mostrar-papeleria', this.editedIndex);

      if(this.editedItem.code == 0){
        alertApp({color:"error", text: this.editedItem, icon: "alert" });
        this.editedItem = {id: '',name: '',lastname: '',cedula: ''};
      }

      this.dialogDelete = true
    },

    deleteItemConfirm: async function() {
      let result = await execute('borrar-papeleria', this.editedIndex);


      if(result.code == 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }

      this.closeDelete();
    },

	generatePDFAll: async function() {
		
		let result = await execute('generate-pdf-papeleria', {export_all: 1});

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
			
		let result = await execute('generate-pdf-papeleria', this.pdf);

		if(result.code == 1) 
			alertApp({color:"success", text: result, icon: "check" }); 
		else
			alertApp({color:"error", text: result, icon: "alert" }); 

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


    close () {
      this.dialog = false;
	  this.cleanForm();
      this.$nextTick(() => {
        this.initialize();
        this.editedIndex = " ";
      })
    },

    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.initialize();
        this.cleanForm();
        this.editedIndex = " ";
      })
    },

    save: async function() {
      let result = null;
      
      if (this.editedIndex != " ") {
        result = await execute('actualizar-papeleria', this.editedItem);
      } else {
        result = await execute('crear-papeleria', this.editedItem);
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
				:items="papelerias"
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
      					<v-toolbar-title>Papeleria</v-toolbar-title>
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
											<v-col cols="6" >
												<v-text-field 
												v-model="editedItem.codigo" 
												label="Codigo"
												prepend-icon="mdi-barcode"
												></v-text-field>
											</v-col>

											<v-col cols="12" >
												<v-text-field 
												v-model="editedItem.descripcion" 
												label="Descripcion"
												prepend-icon="mdi-layers-edit"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.entradaKilos"
													label="Entrada en kilos"
													prepend-icon="mdi-call-made"
													type="number"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
												<v-text-field
													v-model="editedItem.salidaKilos"
													label="Salida en Kilos"
													prepend-icon="mdi-call-received"
													type="number"
												></v-text-field>
											</v-col>

											<v-col cols="6" >
											<v-text-field
												v-model="editedItem.cantidadExistente = editedItem.entradaKilos - editedItem.salidaKilos"
												label="Cantidad existente"
												prepend-icon="mdi-scale-unbalanced"
												type="number"
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
          <v-card-title class="text-h5">Estas seguro que deseas eliminar esta Papeleria?</v-card-title>
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
  </v-container>

  `
});

export default papelerias;