'use strict'

//import '../utils/autocomplete.js';
//import '../dialog/details_dialog.js';
//import './dialog/sold_invoice_dialog.js';

// componente clients
let home = Vue.component('home', {

  data: () => ({
    dialog: false,
    dialogDelete: false,
	dialogDetails: false,
	dialogSold: false,
    page: 1,
    pageCount: 0,
    search: "",
    hidden: false,
    headers: [
		{ text: 'Nombre', value: 'name' },
		{ text: 'Serial', value: 'code' },
		{ text: 'Descripcion', value: 'description' },
		{ text: 'Categoria', value: 'category' },
		{ text: 'Fecha de compra', value: 'date_purchase' },
		{ text: 'Inversión Total', value: 'total' },
		{ text: 'Acciones', value: 'actions', sortable: false },
    ],
    trucks: [],
	truck_id: null,
    editedIndex: -1,
    editedItem: {},
	menu: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Registrar Nueva Maquinaria' : 'Actualizar una Maquinaria';
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
      this.trucks = await execute('index-trucks',{});

      if(Math.round ( Object.keys(this.trucks).length / 16) >= 1 )
        this.pageCount =  Math.round ( Object.keys(this.trucks).length / 16);
    },

    editItem: async function(item) {
      this.editedIndex = item.id
      this.editedItem = await execute('show-truck', this.editedIndex);
      this.dialog = true
    },

    deleteItem: async function(item) {
      this.editedIndex = item.id;
      this.editedItem = await execute('show-truck', this.editedIndex);

      if(this.editedItem.code == 0){
        alertApp({color:"error", text: this.editedItem, icon: "alert" });
        this.editedItem = {id: '',name: '',lastname: '',cedula: ''};
      }

      this.dialogDelete = true
    },

    deleteItemConfirm: async function() {
      let result = await execute('destroy-truck', this.editedIndex);


      if(result.code == 1) {
        alertApp({color:"success", text: result, icon: "check" }); 
      }else{
        alertApp({color:"error", text: result, icon: "alert" }); 
      }

      this.closeDelete();
    },

	formatMoney: function(value) {
		let formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});
	  
		return formatter.format(value);
	},

	openDialog: function(truck){
		this.truck_id = truck.id;
		this.dialogDetails = true;
	},

	closeDialog: function() {
		this.dialogDetails = false;
		this.truck_id = null;
		this.initialize();
	},

	openDialogSold: function(truck){
		this.truck_id = truck.id;
		this.dialogSold = true;
		console.log('hola')
	},

	closeDialogSold: function() {
		this.dialogSold = false;
		this.initialize();
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
        result = await execute('update-truck', this.editedItem);
      } else {
        result = await execute('create-truck', this.editedItem);
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
  		<h1>Vista en mantenimiento XD esperando recursos <h1>

  `
});

export default home;
