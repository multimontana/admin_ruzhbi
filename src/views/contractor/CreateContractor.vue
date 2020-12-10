<template>
    <div>
        <div class="form-group">
            <label>Название *</label>
            <input type="text" class="form-control form-control-lg" v-model="contractor.title" required>
        </div>
        <div class="form-group">
            <label>Контакты</label>
            <input type="text" class="form-control form-control-lg" v-model="contractor.contact" required>
        </div>
        <div class="form-group">
            <label>E-mail</label>
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
                <input type="checkbox" class="form-control" style="width: 40px" v-model="checked"> <input type="text"
                                                                                                          class="form-control form-control-lg"
                                                                                                          @keyup="getStation()"
                                                                                                          v-model="contractor.station">
            </div>
            <ul class="list-group selectStyle" v-if="station.length">
                <li class="list-group-item" v-for="(stat, index) in station" :key="index"
                    @click="selectedStation(stat)">{{ stat.code }}-{{ stat.region }}({{ stat.road }})
                </li>
            </ul>
        </div>
        <div class="form-group">
            <label>Статус</label>
            <select class="form-control form-control-lg" v-model="contractor.status">
                <option value="0" selected="">Не определен</option>
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
        <button class="btn btn-primary" @click="create()">Добавить</button>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "CreateContractor",
    data() {
        return {
            contractor: {
                title: '',
                contact: '',
                email: '',
                site: '',
                station: '',
                station_id: '',
                comment: ''
            },
            checked: false,
            station: []
        };
    },
    methods: {
        ...mapActions(['createContractor', 'getStations']),
        getStation() {
            this.getStations(this.contractor.station).then(res => {
                this.station = res.station;
            });
        },
        selectedStation(item) {
            this.contractor.station = item.code + '-' + item.region + '(' + item.road + ')'
            this.contractor.station_id = item.id
            this.station = []
        },
        create() {
            if (this.checked && !this.contractor.station_id) {
                this.contractor.station_id = 0
            }
            this.createContractor(this.contractor).then(res => {
                if (res.success) {
                    this.$router.push('/contractor/all')
                } else {
                    alert('Please check and insert again')
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
</style>

