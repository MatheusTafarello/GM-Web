<template>
  <div class="author-form">
    <Popup :dialog="openDialog" @cancel="openDialog = false" :type="type" />
    <FormHeader class="header" title="Editar Autor" subTitle :list="routes" />
    <div :class="['forms', $vuetify.breakpoint.smAndDown ? 'mobile' : 'desktop']">
      <EditAuthorForm class="container" @sendData="fetchData" />
      <EditAuthorAddressForm @sendData="fetchData" class="container" />
    </div>
    <div class="buttons">

      <v-btn 
        class="btn" 
        raised 
        color="gray" 
        @click="cancel()"
      >
      Cancelar
      </v-btn>

      <v-btn 
        class="btn" 
        raised 
        color="success" 
        :loading="isLoading" 
        @click="sendAuthor()"
      >
      Concluir
      </v-btn>
      
    </div>
  </div>  
</template> 

<script>
import FormHeader from "@/common-components/FormHeader/FormHeader.vue";
import Popup from '@/common-components/Popup/Popup.vue';
import EditAuthorAddressForm from "./EditAuthorAddressForm.vue";
import EditAuthorForm from "./EditAuthorForm.vue";
import { editAuthor } from "@/services/author.js";

export default {
  data: () => ({
    routes: [
      { name: "Pagina Inicial", route: "home" },
      { name: "Gerenciar Autores", route: "manege_authors" },
      { name: "Editar Autor", router: ""}
    ],
    form: {},
    openDialog: false,
    isLoading: false,
    type: 'delete',
    author: null, 
  }),
  
  methods: {
    fetchData(form) {
      Object.keys(form).map(key => {
        this.form[key] = form[key];
      });
    },
        sendData() {
          this.$emit('sendData', this.form);
        },
        async sendAuthor(){
          const id = this.$route.query.id;
          const { authorValid, addressValid } = this.form;
          const form = { ...this.form };
          this.isLoading = true;
      
          //visualizar qual dos campos está como false/undefined
          console.info("autor: ",authorValid, "endereço:", addressValid)
          if (authorValid && addressValid) {
            const fd = new FormData();
            fd.append('photograph', form.image, 'authorPhoto.jpg');
            for (const field in form) {
              if (
                field === 'authorValid' ||
                field === 'addressValid' ||
                field === 'image' ||
                field === 'photograph'
              ) {
                continue;
              } else {
                
                if (field === 'cep' || field === 'cpf') {
                  let sanitizedField = form[field].replaceAll('-', '');
                  sanitizedField = sanitizedField.replaceAll('.', '');
                  fd.append(`${field}`, sanitizedField);
                } else {
                  fd.append(`${field}`, form[field]);
                }
              }
            }
            // delete form.image;

            fd.delete('authorAddresses')
            fd.delete('id')
            let status = await editAuthor(id, fd)

            // pop up
            this.type='editAuthor';
            this.openDialog = true;
            if (status) this.$router.push('/manage_authors')
          }
          this.isLoading = false;
        },
      cancel() 
      {
        this.$router.push('/manage_authors');
      }
  },

  components: {
    FormHeader,
    EditAuthorForm,
    EditAuthorAddressForm,
    Popup
  },
};
</script>

<style scoped lang="css">
.author-form {
  padding: 1% 3%;
}

.author-form textarea {
  resize: none;
}

.forms {
  display: grid;
  max-width: 100%;
  min-height: 95%;
  justify-content: center;
}

.desktop {
  grid-template-columns: 50% 50%;
}

.mobile {
  grid-template-rows: repeat(auto, 3);
  grid-template-columns: 1fr;
}

.container {
  width: 80%;
  margin-top: 20px;
  padding: 0;
}

.buttons {
  position: relative;
  bottom: 15%;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 1rem;
}

.btn {
  margin-right: 0.7rem;
  margin-left: 0.3rem;
}
</style>