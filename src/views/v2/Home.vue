<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h2 class="text-primary"> Accueil </h2>
    </div>
  </div>
  <hr>
  <div class="body-contentys">
    <div class="row justify-content-center">
      <div class="col-4">
        <rows-counter premier_titre="Fiche Mobilisation" second_titre="Fiche Mobilisations"
          icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nO2Zuy5FURCGv5ya5KhdEgkP4NKoeATehspj0FPQ0JNwQkkpShoFoRKJcmQnv0ROwSxnrL0j8yUru/kzsybr25dkg58zwDqyLhkB69j6NSMXCMJyEJEnEoylWiLVCsZSLZFqBWOplki1grFUS6RawViqJVKtYCzVEqlWMJZqiVQrGEu1RKoVjKVaItUKxlKt/6ZWV7DSQWaAfeClY/8IrWSQeeCpxf+DFxGD9IBrhc+BSf6Wpt9VQT/zDrKh4AMwFrPX0H7mHeRQwU3qUNrPvIPcK7hEHUr6jSv76in8rvAEdSjpt6DsbXThCEr6bSu74yl8p/AydfD26wPPyq55Ch8ovBWzz5B+PeBYuVNv4fXKj9+f+vWBI2WaE5n1Fv76QhwAU7H7/vaFOFC/ZqBF3ROfOjXXldLic8Bji58oNrROSk5imGlgr6WPxjfgBtgFVj27/QCr1ZaE9VjCnwAAAABJRU5ErkJggg=="
          description="Toutes les fiches des mobilisations" url="/mobilization_sheet/all">
        </rows-counter>
      </div>

      <div class="col-4">
        <rows-counter premier_titre="Fiche Climat" second_titre="Fiche Climats"
          icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nO2Zuy5FURCGv5ya5KhdEgkP4NKoeATehspj0FPQ0JNwQkkpShoFoRKJcmQnv0ROwSxnrL0j8yUru/kzsybr25dkg58zwDqyLhkB69j6NSMXCMJyEJEnEoylWiLVCsZSLZFqBWOplki1grFUS6RawViqJVKtYCzVEqlWMJZqiVQrGEu1RKoVjKVaItUKxlKt/6ZWV7DSQWaAfeClY/8IrWSQeeCpxf+DFxGD9IBrhc+BSf6Wpt9VQT/zDrKh4AMwFrPX0H7mHeRQwU3qUNrPvIPcK7hEHUr6jSv76in8rvAEdSjpt6DsbXThCEr6bSu74yl8p/AydfD26wPPyq55Ch8ovBWzz5B+PeBYuVNv4fXKj9+f+vWBI2WaE5n1Fv76QhwAU7H7/vaFOFC/ZqBF3ROfOjXXldLic8Bji58oNrROSk5imGlgr6WPxjfgBtgFVj27/QCr1ZaE9VjCnwAAAABJRU5ErkJggg=="
          description="Toutes les fiches des climats" url="/electoral_climate_sheet/all">
        </rows-counter>
      </div>

      <div class="col-4">
        <rows-counter premier_titre="Fiche Goodies" second_titre="Fiches Goodies"
          icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nO2Zuy5FURCGv5ya5KhdEgkP4NKoeATehspj0FPQ0JNwQkkpShoFoRKJcmQnv0ROwSxnrL0j8yUru/kzsybr25dkg58zwDqyLhkB69j6NSMXCMJyEJEnEoylWiLVCsZSLZFqBWOplki1grFUS6RawViqJVKtYCzVEqlWMJZqiVQrGEu1RKoVjKVaItUKxlKt/6ZWV7DSQWaAfeClY/8IrWSQeeCpxf+DFxGD9IBrhc+BSf6Wpt9VQT/zDrKh4AMwFrPX0H7mHeRQwU3qUNrPvIPcK7hEHUr6jSv76in8rvAEdSjpt6DsbXThCEr6bSu74yl8p/AydfD26wPPyq55Ch8ovBWzz5B+PeBYuVNv4fXKj9+f+vWBI2WaE5n1Fv76QhwAU7H7/vaFOFC/ZqBF3ROfOjXXldLic8Bji58oNrROSk5imGlgr6WPxjfgBtgFVj27/QCr1ZaE9VjCnwAAAABJRU5ErkJggg=="
          description="Toutes les fiches des goodies" url="/goodies/all">
        </rows-counter>
      </div>

      <div class="col-4">
        <rows-counter premier_titre="Fiche Alertes et Incidents" second_titre="Fiches alertes et incidents"
          icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nO2Zuy5FURCGv5ya5KhdEgkP4NKoeATehspj0FPQ0JNwQkkpShoFoRKJcmQnv0ROwSxnrL0j8yUru/kzsybr25dkg58zwDqyLhkB69j6NSMXCMJyEJEnEoylWiLVCsZSLZFqBWOplki1grFUS6RawViqJVKtYCzVEqlWMJZqiVQrGEu1RKoVjKVaItUKxlKt/6ZWV7DSQWaAfeClY/8IrWSQeeCpxf+DFxGD9IBrhc+BSf6Wpt9VQT/zDrKh4AMwFrPX0H7mHeRQwU3qUNrPvIPcK7hEHUr6jSv76in8rvAEdSjpt6DsbXThCEr6bSu74yl8p/AydfD26wPPyq55Ch8ovBWzz5B+PeBYuVNv4fXKj9+f+vWBI2WaE5n1Fv76QhwAU7H7/vaFOFC/ZqBF3ROfOjXXldLic8Bji58oNrROSk5imGlgr6WPxjfgBtgFVj27/QCr1ZaE9VjCnwAAAABJRU5ErkJggg=="
          description="Toutes les fiches des alertes et incidents" url="/incident/all">
        </rows-counter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RowsCounter from '@/components/RowsCounter.vue';


export default defineComponent({
  name: 'HomeView',
  components: { RowsCounter },
  methods: {

  }
})
</script>
