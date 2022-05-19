'use strict'

// componente home
let home = Vue.component('home', {

    data: function() {
        return {
            labels: [
                '12am',
                '3am',
                '6am',
                '9am',
                '12pm',
                '3pm',
                '6pm',
                '9pm',
              ],
              value: [
                200,
                675,
                410,
                390,
                310,
                460,
                250,
                240,
              ],
        }
    },

    methods: {
        
    },


	template: `

        <v-container>

            <v-container
              class="cyan darken-4 lighten-5 mb-6"
            >
              <v-row
            
                no-gutters
                style="height: 150px;"
              >
                <v-col>
                  <v-card
                    class="pa-2"
                    style="margin-right:5px"
                    outlined
                    tile
                  >
                    <v-list-item three-line>
                          <v-list-item-content>
                              <div class="text-overline mb-4">
                              Control de papeleria
                              </div>

                          <v-list-item-title class="text-h5 mb-1">
                            Descripcion
                          </v-list-item-title>

                        <hr>
                        <br>

                        <v-list-item-subtitle>Codigo del modulo: </v-list-item-subtitle>
                        <v-list-item-subtitle>Unidad medida: </v-list-item-subtitle>
                        <v-list-item-subtitle>Canidad existente: </v-list-item-subtitle>
                        <v-list-item-subtitle>Canidad minima: </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        tile
                        size="80"
                        color="blue"
                      >
                        <v-icon dark> mdi-layers-edit </v-icon>
                      </v-list-item-avatar>
                    </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      style="background-color:#007bff; color:#ffffff"
                    >
                      ver ahora!
                    </v-btn>
                  </v-card-actions>
                  </v-card>
                </v-col>

                <v-col>
                  <v-card
                    class="pa-2"
                    style="margin-right:5px"
                    outlined
                    tile
                  >
                    <v-list-item three-line>
            
                      <v-list-item-content>
                        <div class="text-overline mb-4">
                          Control de productos
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                          Descripcion
                        </v-list-item-title>
                        <hr>
                        <br>
                        <v-list-item-subtitle>Codigo del modulo: </v-list-item-subtitle>
                        <v-list-item-subtitle>Unidad medida: </v-list-item-subtitle>
                        <v-list-item-subtitle>Canidad existente: </v-list-item-subtitle>
                        <v-list-item-subtitle>Canidad minima: </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        tile
                        size="80"
                        color="blue"
                      >
                        <v-icon dark>
                          mdi-flask
                        </v-icon>
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      style="background-color:#007bff; color:#ffffff"
                    >
                      ver ahora!
                    </v-btn>
                  </v-card-actions>
                </v-card>
          </v-col>

          <v-col

          >
          <v-card
          class="pa-2"
          style="margin-right:5px"
          outlined
          tile
        >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                Control de pintura
                </div>
            <v-list-item-title class="text-h5 mb-1">
            Descripcion
        </v-list-item-title>
        <hr>
        <br>
            <v-list-item-subtitle>Codigo del modulo: </v-list-item-subtitle>
            <v-list-item-subtitle>Unidad medida: </v-list-item-subtitle>
            <v-list-item-subtitle>Canidad existente: </v-list-item-subtitle>
            <v-list-item-subtitle>Canidad minima: </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
        tile
        size="80"
        color="blue"
        >
        <v-icon dark>
        mdi-brush-variant
        </v-icon></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          style="background-color:#007bff; color:#ffffff"
        >
          ver ahora!
        </v-btn>
        </v-card-actions>
     </v-card>
          </v-col>
        </v-row>

        
      </v-container>
      
      <v-container>
        <v-row
          no-gutters
          style="height: 150px; margin-top:100px;"
        >
            <v-col>
            <v-card
            class="mt-4 mx-auto"
            max-width="400"
            style=""
          >
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>
        
            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">
                Entradas 
              </div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
          </v-col>

            <v-col>
            <v-card
            class="mt-4 mx-auto"
            max-width="400"
            style=""
          >
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="green"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
              ></v-sparkline>
            </v-sheet>
        
            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">
                Salidas
              </div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
            </v-col>
        </v-row>
     </v-container>

     </v-container>
    `
});

export default home;
