<template>
  <div>
    <div class="form-group">
      <label>Название *</label>
      <input type="text" class="form-control form-control-lg" v-model="contractor.title" required>
    </div>
    <div class="form-group">
      <label>Контакты</label>
      <input type="text" class="form-control form-control-lg" v-model="contractor.contacts" required>
    </div>
    <div class="form-group">
      <label>Электронная почта</label>
      <input type="email" class="form-control form-control-lg" v-model="contractor.email" required>
    </div>
    <div class="form-group">
      <label>Сайт</label>
      <input type="url" class="form-control form-control-lg" v-model="contractor.site" required>
    </div>
    <div class="form-group">
      <label>Адрес</label>
      <input type="text" class="form-control form-control-lg" v-model="contractor.address" required>
    </div>
    <div class="form-group">
      <label>ЖД станция отгрузки</label>
      <div class="d-flex align-items-center">
        <input type="checkbox" class="form-control" style="width: 40px" v-model="checked">
        <input type="text"
               class="form-control form-control-lg"
               @keyup="getStation()"
               v-model="contractor.station">
      </div>
      <ul class="list-group selectStyle" v-if="stations.length">
        <li class="list-group-item" v-for="(stat, index) in stations" :key="index"
            @click="selectedStation(stat)">{{ stat.code }}-{{ stat.region }}({{ stat.road }})
        </li>
      </ul>
    </div>
    <div class="form-group">
      <label>Статус</label>
      {{ contractor.status }}
      <select class="form-control form-control-lg" v-model="contractor.status">
        <option value="0">Не определен</option>
        <option value="1">Всё ок</option>
        <option value="2">Можно работать, но...</option>
        <option value="3">Не работаем</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Комментарий</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                v-model="contractor.comment"></textarea>
    </div>
    <div>
      <span v-if="error_mess" style="color:red">{{ error_mess }}</span>
    </div>
    <button class="btn btn-primary" @click="create()">Добавить</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CreateContractor",
  data() {
    return {
      error_mess: '',
      contractor: {
        title: '',
        contacts: '',
        email: '',
        site: '',
        station: '',
        station_id: '',
        comment: ''
      },
      checked: false,
      stations: []
    };
  },
  methods: {
    ...mapActions(['createContractor', 'getStations']),
    getStation() {
      this.getStations(this.contractor.station).then(res => {
        this.stations = res.station;
      });
    },
    selectedStation(item) {
      this.contractor.station = item.code + '-' + item.region + '(' + item.road + ')'
      this.contractor.station_id = item.id
      this.stations = []
    },
    create() {
      if (this.checked && !this.contractor.station_id) {
        this.contractor.station_id = 0
      }
      this.createContractor(this.contractor).then(res => {
        if (res.success) {
          this.$router.push('/contractor/all')
        } else {
          for (const resKey in res.data.errors) {
            this.error_mess = res.data.errors[resKey][0]
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.selectStyle {
  max-height: 200px;
  overflow: scroll
}

.selectStyle ul li {
  cursor: pointer
}
</style>

