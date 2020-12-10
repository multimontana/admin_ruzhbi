<template>
  <div>
    <CForm @submit.prevent="onSubmit">
      <div  class="form-group">
        <label for="name" class=""> {{leng[0]}} * </label>
        <input id="name" type="text"
               @blur="$v.name.$touch"
               :placeholder="leng[0]"
               v-model.trim="name"
               :class="{'is-invalid': ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength), 'is-valid': $v.name.$dirty && !$v.name.$invalid}"
               class="form-control"
        >
        <div  v-if="$v.name.$dirty && $v.name.$error" class="invalid-feedback">Please provide at least</div>
      </div>
    <CInput
      :label="leng[1]"
      invalid-feedback="Please provide at least 4 characters."
      v-model="title"
      :placeholder="leng[1]"
    />
    <CInput
      :label="leng[2]"
      invalid-feedback="Please provide at least 4 characters."
      v-model="description"
     :placeholder="leng[2]"
    />
      <div  class="form-group">
        <label for="address" class=""> {{leng[3]}} * </label>
        <input id="address" type="address"
               @blur="$v.address.$touch"
               :placeholder="leng[3]"
               v-model.trim="address"
               :class="{'is-invalid': ($v.address.$dirty && !$v.address.required) || ($v.address.$dirty && !$v.address.minLength), 'is-valid': $v.address.$dirty && !$v.address.$invalid}"
               class="form-control"
        >
        <div  v-if="$v.address.$dirty && $v.address.$error" class="invalid-feedback">Please provide at least</div>
      </div>
    <div class="row">
      <CCol sm="3">
        <div  class="form-group">
          <label for="openTime" class=""> {{leng[4]}} * </label>
          <input id="openTime" type="time"
                 @blur="$v.openTime.$touch"
                 v-model.trim="openTime"
                 :class="{'is-invalid': ($v.openTime.$dirty && !$v.openTime.required), 'is-valid': $v.openTime.$dirty && !$v.openTime.$invalid}"
                 class="form-control"
          >
          <div  v-if="$v.openTime.$dirty && $v.openTime.$error" class="invalid-feedback">Please provide Open Time</div>
        </div>
      </CCol>
      <CCol sm="3">
        <div  class="form-group">
          <label for="closeTime" class=""> {{leng[5]}} * </label>
          <input id="closeTime" type="time"
                 @blur="$v.closeTime.$touch"
                 v-model.trim="closeTime"
                 :class="{'is-invalid': ($v.closeTime.$dirty && !$v.closeTime.required), 'is-valid': $v.closeTime.$dirty && !$v.closeTime.$invalid}"
                 class="form-control"
          >
          <div  v-if="$v.closeTime.$dirty && $v.closeTime.$error" class="invalid-feedback">Please provide Close Time</div>
        </div>
      </CCol>
    </div>
      <template>
        <div class="form-group">
          <label for="img">{{leng[6]}} *</label>
          <VueFileAgent
            id="img"
            ref="vueFileAgent"
            :theme="'grid'"
            :multiple="true"
            :deletable="true"
            :meta="true"
            :editable="true"
            :accept="'image/*'"
            :maxSize="'10MB'"
            :maxFiles="14"
            :helpText="leng[6]"
            @input="$v.fileRecords.$touch"
            :class="{'invalid': ($v.fileRecords.$dirty && !$v.fileRecords.required), 'valid': $v.fileRecords.$dirty && !$v.fileRecords.$invalid}"
            :errorText="{
                type: 'Invalid file type. Only images  Allowed',
                size: 'Files should not exceed 10MB in size',
              }"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>
          <div v-if="$v.fileRecords.$dirty && !$v.fileRecords.required" class="invalid-feedback">Please provide  Images</div>
        </div>
      </template>
      <div class="form-group ">
        <input type="submit" value="Save" class="btn btn_success " />
      </div>
    </CForm>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  export default {
    name: "Form_data",
    validations: {
      name: {
        required,
        minLength: minLength(4)
      },
      address:{
        required,
        minLength: minLength(4)
      },
      fileRecords:{
        required
      },
      openTime:{
        required
      },
      closeTime:{
        required
      }
    },
    props:["leng"],
    data () {
      return {
        name:'',
        title:'',
        description:'',
        openTime:'',
        closeTime:'',
        address:'',
        validator:{
          name:null,
          address:null,
          openTime:null,
          closeTime:null,
        },

        fileRecords: [],
        // uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
        uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
        fileRecordsForUpload: [],

        language:[]
      }
    },
    created(){
    },
    methods: {
      onSubmit(){
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
      },

      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      filesSelected: function (fileRecordsNewlySelected) {
        let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },
      onBeforeDelete: function (fileRecord) {
        let i = this.fileRecordsForUpload.indexOf(fileRecord);
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event

        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        }
      },
      fileDeleted: function (fileRecord) {
        console.log(fileRecord)
        let i = this.fileRecordsForUpload.indexOf(fileRecord);
        console.log(i)
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },
    }
  }
</script>
<style scoped>
  .vue-file-agent.file-input-wrapper {
    border: 2px dashed #d8dbe0;
  }

  .btn_success{
    color: #2eb85c;
    border-color: #2eb85c;
  }
  .btn_success:hover{
    background: #2eb85c;
    color: #fff;
  }
</style>
