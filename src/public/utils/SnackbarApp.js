'use strict';

export default Vue.component('snackbar-app',{
    props: ["text", "icon", "color"],

    data: function(){
        return {
            snackbar: false,
        };
    },

    watch: {
        text: function(value){
            this.snackbar = true;
        }
    },

    template: `
        <v-snackbar 
            v-model = "snackbar"  
            :color="color"
            timeout = "4000"
            :top = "true"
            :vertical="'vertical'"
        >
            
            <div>
                <v-icon v-if = "icon != null" dark>
                    mdi-{{ icon }}
                </v-icon>
                <span class="text-h6"  style = "margin-left: 5px;">
                    {{ text.message }}
                </span>
            </div>
        </v-snackbar>
    `
});