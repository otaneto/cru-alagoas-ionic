webpackJsonp([9],{

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditMeetingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__show_meeting_show_meeting__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__meetings_meetings_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_location_select_location__ = __webpack_require__(96);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EditMeetingPage = /** @class */ (function () {
    function EditMeetingPage(alertCtrl, camera, fb, loadCtrl, meetingsService, modalCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.fb = fb;
        this.loadCtrl = loadCtrl;
        this.meetingsService = meetingsService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.days = [];
        this.photo = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';
    }
    EditMeetingPage.prototype.ngOnInit = function () {
        this.meeting = this.navParams.data.meeting;
        this.center = [this.meeting.location.lat, this.meeting.location.lon];
        this.initMeetingForm();
        this.loadMap();
    };
    EditMeetingPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            quality: 100,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo = 'data:image/jpeg;base64,' + imageData;
            _this.meetingForm.patchValue({
                picture: _this.photo
            });
        }, function (err) {
            // Handle error
        });
    };
    EditMeetingPage.prototype.initMeetingForm = function () {
        this.meetingForm = this.fb.group({
            id: [this.meeting.id, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            name: [this.meeting.name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            location: [this.meeting.location, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            days: [this.meeting.days, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            time: [this.meeting.time, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            description: [this.meeting.description, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            type: [this.meeting.type, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            leaders: [this.meeting.leaders, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            place_description: [this.meeting.place_description, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            picture: [this.meeting.picture || '']
        });
    };
    EditMeetingPage.prototype.selectDays = function (days) {
        this.meetingForm.patchValue({
            days: days
        });
    };
    EditMeetingPage.prototype.selectTime = function (_a) {
        var hour = _a.hour, minute = _a.minute;
        if (this.meetingForm) {
            this.meetingForm.patchValue({
                time: hour + ":" + minute
            });
        }
    };
    EditMeetingPage.prototype.onOpenMap = function () {
        var _this = this;
        this.myMap.remove();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__select_location_select_location__["a" /* SelectLocationPage */]);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.meetingForm.patchValue({
                    location: data.place
                });
                _this.center = [data.place.lat, data.place.lon];
                _this.place = data.place;
            }
            _this.loadMap();
        });
    };
    EditMeetingPage.prototype.truncate = function (string) {
        return Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["truncate"])(string, { length: 80, omission: '...' });
    };
    EditMeetingPage.prototype.loadMap = function () {
        this.myMap = __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.map('edit-map').setView(this.center, 15);
        __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a
            .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
        })
            .addTo(this.myMap);
        this.markPlace();
    };
    EditMeetingPage.prototype.markPlace = function () {
        if (this.marker) {
            this.myMap.removeLayer(this.marker);
        }
        this.marker = __WEBPACK_IMPORTED_MODULE_6_leaflet___default.a.marker(this.center);
        this.myMap.addLayer(this.marker);
    };
    EditMeetingPage.prototype.submitMeeting = function () {
        this.load().present();
        if (this.meetingForm.valid) {
            this.updateMeeting(this.meeting.id);
            if (this.meetingForm.get('picture').value.length > 0) {
                this.uploadImage(this.meeting.id);
            }
        }
    };
    EditMeetingPage.prototype.uploadImage = function (id) {
        var _this = this;
        var picture = this.meetingForm.get('picture').value;
        this.meetingsService
            .uploadMeetingImage({ id: id, picture: picture })
            .then(function (data) {
            // const picture_url = data.metadata.downloadURLs[0];
            console.log(data);
            // this.updateMeeting(id, picture_url);
        })
            .catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Erro ao carregar imagem',
                message: err.message ||
                    'A reunião foi editada, porém a imagem de capa não foi carregada',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    EditMeetingPage.prototype.updateMeeting = function (id) {
        var _this = this;
        if (this.meetingForm.valid) {
            var body_1 = __assign({}, this.meetingForm.value);
            this.meetingsService
                .updateMeeting(body_1)
                .then(function (data) {
                console.log(data);
                _this.myMap.remove();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__show_meeting_show_meeting__["a" /* ShowMeetingPage */], {
                    meeting: body_1
                });
            })
                .catch(function (err) {
                var alert = _this.alertCtrl.create({
                    title: 'Erro ao atualizar Reunião',
                    message: err.message || 'Tente novamente mais tarde',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    EditMeetingPage.prototype.load = function () {
        return this.loadCtrl.create({
            content: 'Carregando...'
        });
    };
    EditMeetingPage.prototype.ionViewWillLeave = function () {
        this.myMap.remove();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('edit-map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], EditMeetingPage.prototype, "mapContainer", void 0);
    EditMeetingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-edit-meeting',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/edit-meeting/edit-meeting.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Editar Reunião</ion-title>\n    <ion-buttons end>\n      <button ion-button color="primary" type="button" clear (click)="submitMeeting()" [disabled]="meetingForm.invalid">Salvar</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="meetingForm">\n    <img *ngIf="photo" [src]="photo" (click)="getImage()">\n    <ion-row justify-content-center>\n      <button ion-button type="button" (click)="getImage()">Selecionar Imagem</button>\n    </ion-row>\n    <ion-item>\n      <ion-input type="text" formControlName="name" placeholder="Título da reunião"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="description" placeholder="Breve descrição"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Dias</ion-label>\n      <ion-select formControlName="days" multiple="true" (ionChange)="selectDays($event)">\n        <ion-option value="Domingo">Domingo</ion-option>\n        <ion-option value="Segunda-feira">Segunda-feira</ion-option>\n        <ion-option value="Terça-feira">Terça-feira</ion-option>\n        <ion-option value="Quarta-feira">Quarta-feira</ion-option>\n        <ion-option value="Quinta-feira">Quinta-feira</ion-option>\n        <ion-option value="Sexta-feira">Sexta-feira</ion-option>\n        <ion-option value="Sábado">Sábado</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Horário</ion-label>\n      <ion-datetime displayFormat="HH:mm" [(ngModel)]="time" displayFormat="HH:mm" formControlName="time" (ionChange)="selectTime($event)"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="leaders" placeholder="Responsáveis pela reunião"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="type" placeholder="Tipo de Reunião (ex: Quebra Gelo, Discipulado)"></ion-input>\n    </ion-item>\n    <div id="edit-map"></div>\n    <div *ngIf="meetingForm.get(\'location\').valid">\n      <p class="place-name">\n        <strong>{{ truncate(meetingForm.get(\'location\').value.display_name) }}</strong>\n      </p>\n    </div>\n    <ion-item *ngIf="meetingForm.get(\'location\').valid">\n      <ion-input type="text" formControlName="place_description" placeholder="Ponto de referência"></ion-input>\n    </ion-item>\n    <ion-row justify-content-center>\n      <button type="button" ion-button (click)="onOpenMap()">{{ meetingForm.get(\'location\').invalid ? \'Selecionar\' : \'Alterar\' }} Local</button>\n    </ion-row>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/edit-meeting/edit-meeting.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_7__meetings_meetings_service__["a" /* MeetingsService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"]])
    ], EditMeetingPage);
    return EditMeetingPage;
}());

//# sourceMappingURL=edit-meeting.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewMeetingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__meetings_meetings_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__select_location_select_location__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__meetings_meetings__ = __webpack_require__(80);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NewMeetingPage = /** @class */ (function () {
    function NewMeetingPage(alertCtrl, camera, fb, loadCtrl, meetingsService, modalCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.fb = fb;
        this.loadCtrl = loadCtrl;
        this.meetingsService = meetingsService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.days = [];
        this.photo = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png';
    }
    NewMeetingPage.prototype.ngOnInit = function () {
        this.initMeetingForm();
        this.center = ['-9.6475', '-35.7337'];
        this.loadMap();
    };
    NewMeetingPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            quality: 100,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.photo = 'data:image/jpeg;base64,' + imageData;
            _this.meetingForm.patchValue({
                picture: _this.photo
            });
        }, function (err) {
            // Handle error
        });
    };
    NewMeetingPage.prototype.initMeetingForm = function () {
        this.meetingForm = this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            location: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            days: [[''], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            time: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            type: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            leaders: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            place_description: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            picture: ['']
        });
    };
    NewMeetingPage.prototype.selectDays = function (days) {
        this.meetingForm.patchValue({
            days: days
        });
    };
    NewMeetingPage.prototype.selectTime = function (_a) {
        var hour = _a.hour, minute = _a.minute;
        if (this.meetingForm) {
            this.meetingForm.patchValue({
                time: hour + ":" + minute
            });
        }
    };
    NewMeetingPage.prototype.onOpenMap = function () {
        var _this = this;
        this.myMap.remove();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__select_location_select_location__["a" /* SelectLocationPage */]);
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.meetingForm.patchValue({
                    location: data.place
                });
                _this.center = [data.place.lat, data.place.lon];
                _this.place = data.place;
            }
            _this.loadMap();
        });
    };
    NewMeetingPage.prototype.truncate = function (string) {
        return Object(__WEBPACK_IMPORTED_MODULE_5_lodash__["truncate"])(string, { length: 80, omission: '...' });
    };
    NewMeetingPage.prototype.loadMap = function () {
        this.myMap = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.map('map').setView(this.center, 15);
        __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a
            .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
        })
            .addTo(this.myMap);
        this.markPlace();
    };
    NewMeetingPage.prototype.markPlace = function () {
        if (this.marker) {
            this.myMap.removeLayer(this.marker);
        }
        this.marker = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.marker(this.center);
        this.myMap.addLayer(this.marker);
    };
    NewMeetingPage.prototype.submitMeeting = function () {
        var _this = this;
        this.load().present();
        if (this.meetingForm.valid) {
            var body = __assign({}, this.meetingForm.value);
            this.meetingsService.createMeeting(body).then(function (data) {
                _this.load().dismiss();
                _this.updateMeeting(data.key);
                if (_this.meetingForm.get('picture').value.length > 0) {
                    _this.uploadImage(data.key);
                }
            });
        }
    };
    NewMeetingPage.prototype.uploadImage = function (id) {
        var _this = this;
        var picture = this.meetingForm.get('picture').value;
        this.meetingsService
            .uploadMeetingImage({ id: id, picture: picture })
            .then(function (data) {
            // const picture_url = data.metadata.downloadURLs[0];
            console.log(data);
            // this.updateMeeting(id, picture_url);
        })
            .catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Erro ao carregar imagem',
                message: err.message ||
                    'A reunião foi criada, porém a imagem de capa não foi carregada',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    NewMeetingPage.prototype.updateMeeting = function (id) {
        var _this = this;
        var body = __assign({ id: id }, this.meetingForm.value);
        this.meetingsService
            .updateMeeting(body)
            .then(function (data) {
            _this.myMap.remove();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__meetings_meetings__["a" /* MeetingsPage */]);
        })
            .catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Erro ao atualizar Reunião',
                message: err.message || 'Tente novamente mais tarde',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    NewMeetingPage.prototype.load = function () {
        return this.loadCtrl.create({
            content: 'Carregando...'
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], NewMeetingPage.prototype, "mapContainer", void 0);
    NewMeetingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-new-meeting',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/new-meeting/new-meeting.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Nova Reunião</ion-title>\n    <ion-buttons end>\n      <button ion-button color="primary" type="button" clear (click)="submitMeeting()" [disabled]="meetingForm.invalid">Salvar</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="meetingForm">\n    <img *ngIf="photo" [src]="photo" (click)="getImage()">\n    <ion-row justify-content-center>\n      <button ion-button type="button" (click)="getImage()">Selecionar Imagem</button>\n    </ion-row>\n    <ion-item>\n      <ion-input type="text" formControlName="name" placeholder="Título da reunião"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="description" placeholder="Breve descrição"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Dias</ion-label>\n      <ion-select formControlName="days" multiple="true" (ionChange)="selectDays($event)">\n        <ion-option value="Domingo">Domingo</ion-option>\n        <ion-option value="Segunda-feira">Segunda-feira</ion-option>\n        <ion-option value="Terça-feira">Terça-feira</ion-option>\n        <ion-option value="Quarta-feira">Quarta-feira</ion-option>\n        <ion-option value="Quinta-feira">Quinta-feira</ion-option>\n        <ion-option value="Sexta-feira">Sexta-feira</ion-option>\n        <ion-option value="Sábado">Sábado</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Horário</ion-label>\n      <ion-datetime displayFormat="HH:mm" [(ngModel)]="time" displayFormat="HH:mm" formControlName="time" (ionChange)="selectTime($event)"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="leaders" placeholder="Responsáveis pela reunião"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" formControlName="type" placeholder="Tipo de Reunião (ex: Quebra Gelo, Discipulado)"></ion-input>\n    </ion-item>\n    <div id="map"></div>\n    <div *ngIf="place">\n      <p class="place-name">\n        <strong>{{ truncate(place.display_name) }}</strong>\n      </p>\n    </div>\n    <ion-item *ngIf="place">\n      <ion-input type="text" formControlName="place_description" placeholder="Ponto de referência"></ion-input>\n    </ion-item>\n    <ion-row justify-content-center>\n      <button type="button" ion-button (click)="onOpenMap()">{{ !place ? \'Selecionar\' : \'Alterar\' }} Local</button>\n    </ion-row>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/new-meeting/new-meeting.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_0__meetings_meetings_service__["a" /* MeetingsService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"]])
    ], NewMeetingPage);
    return NewMeetingPage;
}());

//# sourceMappingURL=new-meeting.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ShowPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShowPostPage = /** @class */ (function () {
    function ShowPostPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ShowPostPage.prototype.ngOnInit = function () {
        this.post = this.navParams.data;
    };
    ShowPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-show-post',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-post/show-post.html"*/'<!--\n  Generated template for the ShowPostPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{post.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-header>\n      <div class="post-header">\n        <ion-item class="avatar-container">\n          <ion-avatar item-start>\n            <img src="http://via.placeholder.com/33x33" width="33" />\n          </ion-avatar>\n        </ion-item>\n        <div class="author-date-container">\n          <strong>Michelle Bryant</strong>\n          <p>22 de abril de 2018</p>\n        </div>\n        <ion-item class="badge-container">\n          <ion-badge item-end>Evangelismo</ion-badge>\n        </ion-item>\n      </div>\n    </ion-card-header>\n    <img src="http://via.placeholder.com/350x160" />\n  </ion-card>\n  <div padding>\n    <span class="post-title">{{ post.title }}</span>\n    <p class="post-subtitle">Lorem ipsum aliquam mattis habitasse vestibulum commodo.</p>\n    <p class="post-content">Lorem ipsum aliquam mattis habitasse vestibulum commodo mattis libero mattis ad blandit, ullamcorper leo. justo sed integer\n      aliquet velit justo eleifend himenaeos platea, netus dapibus aliquam dapibus faucibus praesent aptent aenean himenaeos\n      nisl. velit volutpat iaculis fermentum viverra pharetra, sagittis netus tortor faucibus pharetra morbi, odio gravida\n      morbi enim. Consequat interdum metus tortor lacinia vitae tincidunt cras erat, etiam molestie fringilla adipiscing\n      auctor amet enim, potenti ut tristique pellentesque porta hendrerit mattis. hendrerit aenean platea est a quisque,\n      hac id ut mollis, aliquet donec malesuada ullamcorper. class nulla class fringilla convallis condimentum aenean etiam\n      tellus ultricies potenti, cursus class semper viverra leo cubilia orci auctor maecenas placerat netus, torquent conubia\n      suspendisse cras phasellus facilisis habitant a purus. </p>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-post/show-post.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ShowPostPage);
    return ShowPostPage;
}());

//# sourceMappingURL=show-post.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ShowEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShowEventPage = /** @class */ (function () {
    function ShowEventPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ShowEventPage.prototype.ngOnInit = function () {
        this.event = this.navParams.data;
    };
    ShowEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-show-event',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-event/show-event.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ event.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <img src="http://via.placeholder.com/350x160" />\n    <ion-card-content>\n      <ion-card-title>\n        {{ event.name }}\n      </ion-card-title>\n\n      <p>O Agora é uma experiência de cinco dias para orientar aos líderes da América Latina e do Caribe na tarefa de seguir\n        cumprindo com a Grande Comissão.</p>\n    </ion-card-content>\n    <img src="http://via.placeholder.com/360x180" height="180" />\n    <ion-card-content>\n      <ion-card-title>\n        Igreja Batista do Farol\n      </ion-card-title>\n      <p class="event-subtitle">Av. Dom Antônio Brandão, 90 - Farol, Maceió - AL, 57051-190</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-event/show-event.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ShowEventPage);
    return ShowEventPage;
}());

//# sourceMappingURL=show-event.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(67);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserPage = /** @class */ (function () {
    function UserPage(alertCtrl, _authService, fb, loadingCtrl, navCtrl, navParams, userService) {
        this.alertCtrl = alertCtrl;
        this._authService = _authService;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.user = {};
    }
    UserPage.prototype.ngOnInit = function () {
        this.initForms();
        this.getUser();
    };
    UserPage.prototype.getUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        loading.present();
        var user = this.userService.getAuthenticatedUser();
        this.user = { id: user.uid };
        this.userService
            .getUserInfo(user.uid)
            .then(function (data) {
            _this.user = __assign({}, _this.user, data.val());
            loading.dismiss();
            _this.initFormsWithValue();
        })
            .catch(function (err) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Erro ao carregar usuário',
                message: err.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    UserPage.prototype.initForms = function () {
        this.userForm = this.fb.group({
            birthday: [''],
            name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].email])]
        });
    };
    UserPage.prototype.initFormsWithValue = function () {
        this.userForm.patchValue({
            birthday: this.user.birthday,
            name: this.user.name,
            email: this.user.email
        });
    };
    UserPage.prototype.logout = function () {
        this._authService.logout();
    };
    UserPage.prototype.updateUser = function (field) {
        var _this = this;
        var body = __assign({}, this.user, this.userForm.value);
        var previousValue = this.user[field];
        var currentValue = this.userForm.get(field).value;
        console.log(body);
        if (this.userForm.get(field).valid && previousValue !== currentValue) {
            this.userService
                .updateUser(body)
                .then(function (data) {
                _this.onSuccessUpdateUser(data);
            })
                .catch(function (err) {
                _this.onUpdateUserError(err);
            });
        }
    };
    UserPage.prototype.onSuccessUpdateUser = function (data) {
        console.log(data);
    };
    UserPage.prototype.onUpdateUserError = function (err) {
        var alert = this.alertCtrl.create({
            title: 'Não é possivel atualizar o usuário',
            message: err.message,
            buttons: ['Ok']
        });
        alert.present();
    };
    UserPage.prototype.onFormInvalid = function () {
        var alert = this.alertCtrl.create({
            title: 'Não é possivel atualizar o usuário',
            message: 'Por favor, preencha todos os campos',
            buttons: ['Ok']
        });
        alert.present();
    };
    UserPage.prototype.updateDate = function (birthday) {
        this.updateUser('birthday');
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/user/user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Usuário</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]="userForm">\n    <ion-item>\n      <ion-input type="text" formControlName="name" placeholder="Nome" (ionBlur)="updateUser(\'name\')"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-datetime displayFormat="DD/MMM/YYYY" pickerFormat="DD-MM-YYYY" formControlName="birthday" placeholder="Data de Nascimento"\n        (ionChange)="updateDate($event)"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-input type="email" formControlName="email" placeholder="Email" (ionBlur)="updateUser(\'email\')"></ion-input>\n    </ion-item>\n  </form>\n  <button block ion-button color="danger" outline (click)="logout()">Sair</button>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/user/user.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user_service__ = __webpack_require__(67);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SignUpPage = /** @class */ (function () {
    function SignUpPage(_authService, alertCtrl, fb, loadingCtrl, navCtrl, navParams, userService) {
        this._authService = _authService;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
    }
    SignUpPage.prototype.ngOnInit = function () {
        this.initForms();
    };
    SignUpPage.prototype.initForms = function () {
        this.signUpForm = this.fb.group({
            birthday: [''],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email])],
            confirm_password: [
                '',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)])
            ],
            password: [
                '',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)])
            ]
        });
    };
    SignUpPage.prototype.confirmPasswordIsEqualPassword = function () {
        return (this.signUpForm.get('confirm_password').value ===
            this.signUpForm.get('password').value);
    };
    SignUpPage.prototype.signUp = function () {
        var _this = this;
        var email = this.signUpForm.get('email').value;
        var password = this.signUpForm.get('password').value;
        var loading = this.loadingCtrl.create({
            content: 'Cadastrando...'
        });
        loading.present();
        if (this.signUpForm.valid) {
            this._authService
                .signUp(email, password)
                .then(function (data) {
                _this.createUser(data.user.uid, loading);
            })
                .catch(function (err) {
                loading.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Erro ao cadastrar',
                    message: err.message,
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    SignUpPage.prototype.createUser = function (id, loading) {
        var user = __assign({ id: id }, Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["omit"])(this.signUpForm.value, ['password', 'confirm_password']));
        this.userService.createUser(user);
        loading.dismiss();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    SignUpPage.prototype.goToLoginPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sign-up',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/sign-up/sign-up.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Cadastrar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="signUpForm" (ngSubmit)="signUp()">\n    <ion-item>\n      <ion-label floating [color]="signUpForm.get(\'name\').touched && !signUpForm.get(\'name\').valid && \'danger\'">Nome</ion-label>\n      <ion-input type="text" formControlName="name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Data de Nascimento</ion-label>\n      <ion-datetime displayFormat="DD/MMM/YYYY" pickerFormat="DD-MM-YYYY" [(ngModel)]="birthday" formControlName="birthday"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating [color]="signUpForm.get(\'email\').touched && !signUpForm.get(\'email\').valid && \'danger\'">E-mail</ion-label>\n      <ion-input type="email" formControlName="email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating [color]="signUpForm.get(\'password\').touched && !signUpForm.get(\'password\').valid && \'danger\'">Senha</ion-label>\n      <ion-input type="password" minLength="6" formControlName="password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating [color]="signUpForm.get(\'confirm_password\').touched && !confirmPasswordIsEqualPassword() && \'danger\'">Confirmar senha</ion-label>\n      <ion-input type="password" minLength="6" formControlName="confirm_password"></ion-input>\n    </ion-item>\n    <button ion-button full type="submit" [disabled]="!signUpForm.valid || !confirmPasswordIsEqualPassword()">Cadastrar</button>\n  </form>\n  <a class="primary" (click)="goToLoginPage()">Já possuo cadastro!</a>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/sign-up/sign-up.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_7__services_user_service__["a" /* UserService */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 183;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/edit-meeting/edit-meeting.module": [
		718,
		8
	],
	"../pages/login/login.module": [
		719,
		7
	],
	"../pages/new-meeting/new-meeting.module": [
		720,
		6
	],
	"../pages/select-location/select-location.module": [
		721,
		5
	],
	"../pages/show-event/show-event.module": [
		722,
		4
	],
	"../pages/show-meeting/show-meeting.module": [
		723,
		3
	],
	"../pages/show-post/show-post.module": [
		724,
		2
	],
	"../pages/sign-up/sign-up.module": [
		725,
		1
	],
	"../pages/user/user.module": [
		726,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 227;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
    }
    LocationService.prototype.getLocation = function (query) {
        return this.http.get("http://nominatim.openstreetmap.org/search?q=" + query + "&format=json");
    };
    LocationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], LocationService);
    return LocationService;
}());

//# sourceMappingURL=location.service.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_post_show_post__ = __webpack_require__(169);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostsPage = /** @class */ (function () {
    function PostsPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PostsPage.prototype.ngOnInit = function () {
        this.initPostsArray();
    };
    PostsPage.prototype.initPostsArray = function () {
        this.posts = [
            { title: 'Como me aproximar mais de Deus' },
            { title: 'Conheça a ferramenta 3 leis espirituais' },
            { title: 'Como executar desafio do voluntário chave' },
            { title: '5 lições que aprendemos com o apóstolo Paulo' }
        ];
        this.postsFound = this.posts;
    };
    PostsPage.prototype.getPosts = function (event) {
        var value = event.target.value;
        var expression = new RegExp(value, 'i');
        this.postsFound = this.posts.filter(function (item) { return expression.test(item.title); });
    };
    PostsPage.prototype.showPost = function (post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__show_post_show_post__["a" /* ShowPostPage */], __assign({}, post));
    };
    PostsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-posts',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/posts/posts.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Publicações\n    </ion-title>\n  </ion-navbar>\n  <ion-searchbar (ionInput)="getPosts($event)" placeholder="Buscar publicação"></ion-searchbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let post of postsFound" (click)="showPost(post)">\n    <ion-card-header>\n      <div class="post-header">\n        <ion-item class="avatar-container">\n          <ion-avatar item-start>\n            <img src="http://via.placeholder.com/33x33" width="33" />\n          </ion-avatar>\n        </ion-item>\n        <div class="author-date-container">\n          <strong>Michelle Bryant</strong>\n          <p>22 de abril de 2018</p>\n        </div>\n        <ion-item class="badge-container">\n          <ion-badge item-end>Evangelismo</ion-badge>\n        </ion-item>\n      </div>\n    </ion-card-header>\n    <img src="http://via.placeholder.com/350x160" />\n    <ion-card-content>\n      <ion-card-title>\n        {{ post.title }}\n      </ion-card-title>\n      <p>Sexta-feira - 18:30</p>\n      <p>Instituto Federal de Alagoas - IFAL</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/posts/posts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], PostsPage);
    return PostsPage;
}());

//# sourceMappingURL=posts.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_event_show_event__ = __webpack_require__(170);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventsPage = /** @class */ (function () {
    function EventsPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    EventsPage.prototype.ngOnInit = function () {
        this.initEventsArray();
    };
    EventsPage.prototype.initEventsArray = function () {
        this.events = [
            { name: 'AGORA 2018' },
            { name: 'Encontrão Café com a CRU' }
        ];
        this.eventsFound = this.events;
    };
    EventsPage.prototype.getEvents = function (event) {
        var value = event.target.value;
        var expression = new RegExp(value, 'i');
        this.eventsFound = this.events.filter(function (item) { return expression.test(item.name); });
    };
    EventsPage.prototype.showEvent = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__show_event_show_event__["a" /* ShowEventPage */], __assign({}, event));
    };
    EventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-events',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/events/events.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Eventos\n    </ion-title>\n  </ion-navbar>\n  <ion-searchbar (ionInput)="getEvents($event)" placeholder="Buscar evento"></ion-searchbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let event of eventsFound" (click)="showEvent(event)">\n    <img src="http://via.placeholder.com/350x160" />\n    <ion-card-content>\n      <ion-card-title>\n        {{ event.name }}\n      </ion-card-title>\n      <p class="event-subtitle">\n        16 a 18 de setembro de 2018\n        <br> Igreja Batista do Farol - Maceió\n      </p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/events/events.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCJTj7OXR9ewE8t8zDsTGstIfPw3rUhwqo',
  authDomain: 'app-cru-alagoas.firebaseapp.com',
  databaseURL: 'https://app-cru-alagoas.firebaseio.com',
  projectId: 'app-cru-alagoas',
  storageBucket: 'app-cru-alagoas.appspot.com',
  messagingSenderId: '393446787429'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = FIREBASE_CONFIG;



/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(380);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_select_searchable__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_events_events__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_posts_posts__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_meetings_meetings__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_user_user__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_sign_up_sign_up__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_show_meeting_show_meeting__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_show_post_show_post__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_show_event_show_event__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_new_meeting_new_meeting__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_select_location_select_location__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_edit_meeting_edit_meeting__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_component__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__constants_firebase_config__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_google_plus__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_authentication_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_user_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_meetings_meetings_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_select_location_location_service__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Pages

















// Services






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_posts_posts__["a" /* PostsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_meetings_meetings__["a" /* MeetingsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_show_meeting_show_meeting__["a" /* ShowMeetingPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_show_post_show_post__["a" /* ShowPostPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_show_event_show_event__["a" /* ShowEventPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_new_meeting_new_meeting__["a" /* NewMeetingPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_select_location_select_location__["a" /* SelectLocationPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_edit_meeting_edit_meeting__["a" /* EditMeetingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/edit-meeting/edit-meeting.module#EditMeetingPageModule', name: 'EditMeetingPage', segment: 'edit-meeting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-meeting/new-meeting.module#NewMeetingPageModule', name: 'NewMeetingPage', segment: 'new-meeting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/select-location/select-location.module#SelectLoacationPageModule', name: 'SelectLocationPage', segment: 'select-location', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/show-event/show-event.module#ShowEventPageModule', name: 'ShowEventPage', segment: 'show-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/show-meeting/show-meeting.module#ShowMeetingPageModule', name: 'ShowMeetingPage', segment: 'show-meeting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/show-post/show-post.module#ShowPostPageModule', name: 'ShowPostPage', segment: 'show-post', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user/user.module#UserPageModule', name: 'UserPage', segment: 'user', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_23__constants_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_select_searchable__["SelectSearchableModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_posts_posts__["a" /* PostsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_meetings_meetings__["a" /* MeetingsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_show_meeting_show_meeting__["a" /* ShowMeetingPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_show_post_show_post__["a" /* ShowPostPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_show_event_show_event__["a" /* ShowEventPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_new_meeting_new_meeting__["a" /* NewMeetingPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_select_location_select_location__["a" /* SelectLocationPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_edit_meeting_edit_meeting__["a" /* EditMeetingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_26__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_27__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_28__pages_meetings_meetings_service__["a" /* MeetingsService */],
                __WEBPACK_IMPORTED_MODULE_29__pages_select_location_location_service__["a" /* LocationService */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MeetingsService = /** @class */ (function () {
    function MeetingsService() {
    }
    MeetingsService.prototype.getMeetings = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .database()
            .ref('meetings')
            .once('value');
    };
    MeetingsService.prototype.getMeetingInfo = function (id) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .database()
            .ref('meetings')
            .child(id)
            .once('value');
    };
    MeetingsService.prototype.createMeeting = function (data) {
        var body = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["omit"])(data, ['picture']);
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .database()
            .ref("meetings")
            .push(body);
    };
    MeetingsService.prototype.updateMeeting = function (data) {
        var body = {};
        body[data.id] = data;
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .database()
            .ref('meetings')
            .update(body);
    };
    MeetingsService.prototype.uploadMeetingImage = function (data) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .storage()
            .ref("meetings/" + data.id + ".jpeg")
            .putString(data.picture.substring(23), 'data_url', {
            contentType: 'image/jpg'
        });
    };
    MeetingsService.prototype.deleteMeeting = function (data) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a
            .database()
            .ref('meetings')
            .child(data.id)
            .remove();
    };
    MeetingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MeetingsService);
    return MeetingsService;
}());

//# sourceMappingURL=meetings.service.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_google_plus__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(googlePlusService) {
        this.googlePlusService = googlePlusService;
    }
    AuthenticationService.prototype.signUp = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().createUserWithEmailAndPassword(email, password);
    };
    AuthenticationService.prototype.login = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthenticationService.prototype.logout = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signOut();
    };
    AuthenticationService.prototype.loginWithGoogle = function () {
        return this.googlePlusService
            .login({
            webClientId: '393446787429-47se6q4qn6mh6oapfi2fn8cq9e2c4spu.apps.googleusercontent.com',
            offline: true
        })
            .then(function (res) {
            return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a
                .auth()
                .signInWithCredential(__WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken));
        });
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], AuthenticationService);
    return AuthenticationService;
}());

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getAuthenticatedUser = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().currentUser;
    };
    UserService.prototype.getUserInfo = function (id) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a
            .database()
            .ref('users')
            .child(id)
            .once('value');
    };
    UserService.prototype.createUser = function (data) {
        var user = __assign({}, data, { roles: ['user'] });
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a
            .database()
            .ref("users/" + data.id)
            .update(user);
    };
    UserService.prototype.updateUser = function (data) {
        var updates = {};
        updates[data.id] = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["omit"])(data, ['id']);
        console.log(updates);
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a
            .database()
            .ref('users')
            .update(updates);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_firebase_config__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        var config = __WEBPACK_IMPORTED_MODULE_7__constants_firebase_config__["a" /* FIREBASE_CONFIG */];
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.initializeApp(config);
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuthenticated = true;
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                _this.isAuthenticated = false;
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/app/app.html"*/'<ion-nav [root]="rootPage" #nav></ion-nav>\n'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeetingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_meeting_show_meeting__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_meeting_new_meeting__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__meetings_service__ = __webpack_require__(58);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MeetingsPage = /** @class */ (function () {
    function MeetingsPage(alertCtrl, loadingCtrl, navCtrl, userService, meetingsService) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.meetingsService = meetingsService;
        this.isAdmin = false;
    }
    MeetingsPage.prototype.ngOnInit = function () {
        this.getMeetings();
        this.getUser();
    };
    MeetingsPage.prototype.getUser = function () {
        var _this = this;
        var authenticatedUser = this.userService.getAuthenticatedUser();
        this.userService
            .getUserInfo(authenticatedUser.uid)
            .then(function (data) {
            _this.user = data.val();
            _this.isAdmin = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["indexOf"])(_this.user.roles, 'admin') !== -1;
        })
            .catch(function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Erro ao buscar usuários',
                message: err.message || 'Tente novamente mais tarde',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    MeetingsPage.prototype.getMeetings = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        loading.present();
        this.meetingsService
            .getMeetings()
            .then(function (data) {
            loading.dismissAll();
            _this.meetings = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["values"])(data.val());
            _this.meetings = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["orderBy"])(_this.meetings, ['name']);
            _this.meetingsFound = _this.meetings;
        })
            .catch(function (err) {
            loading.dismissAll();
            var alert = _this.alertCtrl.create({
                title: 'Erro ao buscar reuniões',
                message: err.message || 'Tente novamente mais tarde',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    MeetingsPage.prototype.goToNewMeetingPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__new_meeting_new_meeting__["a" /* NewMeetingPage */]);
    };
    MeetingsPage.prototype.serachMeetings = function (event) {
        var value = event.target.value;
        var expression = new RegExp(value, 'i');
        this.meetingsFound = this.meetings.filter(function (item) {
            return expression.test(item.name);
        });
        this.meetingsFound = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["orderBy"])(this.meetingsFound, ['name']);
    };
    MeetingsPage.prototype.concatDays = function (days) {
        var daysString = days.reduce(function (init, item) {
            if (days.length > 1) {
                return item + ', ';
            }
            else {
                return item;
            }
        }, '');
        return daysString;
    };
    MeetingsPage.prototype.showMeeting = function (meeting) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__show_meeting_show_meeting__["a" /* ShowMeetingPage */], __assign({}, meeting));
    };
    MeetingsPage.prototype.truncate = function (string) {
        return Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["truncate"])(string, { length: 80, omission: '...' });
    };
    MeetingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-meetings',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/meetings/meetings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Reuniões</ion-title>\n    <ion-buttons end>\n      <button ion-button color="primary" *ngIf="isAdmin" (click)="goToNewMeetingPage()">Nova</button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar (ionInput)="serachMeetings($event)" placeholder="Buscar reunião"></ion-searchbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let meeting of meetingsFound" (click)="showMeeting(meeting)">\n    <img src="http://via.placeholder.com/350x160" />\n    <ion-card-content>\n      <ion-card-title>\n        <ion-row justify-content-between>\n          {{ meeting.name }}\n        </ion-row>\n      </ion-card-title>\n      <p>{{ concatDays(meeting.days) }} - {{ meeting.time }}</p>\n      <p>{{ truncate(meeting.location.display_name) }}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/meetings/meetings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_6__meetings_service__["a" /* MeetingsService */]])
    ], MeetingsPage);
    return MeetingsPage;
}());

//# sourceMappingURL=meetings.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__posts_posts__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_events__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__meetings_meetings__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__meetings_meetings__["a" /* MeetingsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__posts_posts__["a" /* PostsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__events_events__["a" /* EventsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Reuniões" tabIcon="people"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Publicações" tabIcon="document"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Eventos" tabIcon="calendar"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Usuário" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowMeetingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_meeting_edit_meeting__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__meetings_meetings_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__meetings_meetings__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShowMeetingPage = /** @class */ (function () {
    function ShowMeetingPage(alertCtrl, meetingsService, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.meetingsService = meetingsService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ShowMeetingPage.prototype.ngOnInit = function () {
        this.meeting = this.navParams.data;
        if (this.meeting) {
            this.center = [this.meeting.location.lat, this.meeting.location.lon];
            this.loadMap();
        }
    };
    ShowMeetingPage.prototype.truncate = function (string) {
        return Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["truncate"])(string, { length: 80, omission: '...' });
    };
    ShowMeetingPage.prototype.concatDays = function (days) {
        var daysString = days.reduce(function (init, item) {
            if (days.length > 1) {
                return init + item + ', ';
            }
            else {
                return item;
            }
        }, '');
        return daysString;
    };
    ShowMeetingPage.prototype.loadMap = function () {
        this.myMap = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.map('map').setView(this.center, 15);
        __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a
            .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
        })
            .addTo(this.myMap);
        this.markPlace();
    };
    ShowMeetingPage.prototype.markPlace = function () {
        if (this.marker) {
            this.myMap.removeLayer(this.marker);
        }
        this.marker = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.marker(this.center);
        this.myMap.addLayer(this.marker);
    };
    ShowMeetingPage.prototype.editMeeting = function (meeting) {
        this.myMap.remove();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__edit_meeting_edit_meeting__["a" /* EditMeetingPage */], { meeting: meeting });
    };
    ShowMeetingPage.prototype.deleteMeeting = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Tem certeza que deseja remover a reunião?',
            message: 'Esta ação não poderá ser desfeita',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    handler: function () {
                        _this.onConfirmDelete();
                    }
                }
            ]
        });
        alert.present();
    };
    ShowMeetingPage.prototype.onConfirmDelete = function () {
        var _this = this;
        this.meetingsService
            .deleteMeeting(this.meeting)
            .then(function (data) {
            _this.onDeleteSuccess();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__meetings_meetings__["a" /* MeetingsPage */]);
        })
            .catch(function (err) { return _this.onDeleteError(err); });
    };
    ShowMeetingPage.prototype.onDeleteSuccess = function () {
        var alert = this.alertCtrl.create({
            title: 'Reunião excluída com sucesso',
            buttons: ['Ok']
        });
        alert.present();
    };
    ShowMeetingPage.prototype.onDeleteError = function (err) {
        var alert = this.alertCtrl.create({
            title: 'Não foi possível excluir reunião',
            message: err.message || 'Tente novamente mais tarde',
            buttons: ['Ok']
        });
        alert.present();
    };
    ShowMeetingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-show-meeting',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-meeting/show-meeting.html"*/'<!--\n  Generated template for the ShowMeetingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ meeting.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <img *ngIf="meeting.picture" [attr.src]="meeting.picture" />\n    <img *ngIf="!!meeting.picture === false" src="http://via.placeholder.com/350x160" />\n    <ion-card-content>\n      <ion-card-title>\n        <ion-row justify-content-between>\n          {{ meeting.name }}\n          <div class="actions">\n            <ion-icon name="ios-create-outline" (click)="editMeeting(meeting)"></ion-icon>\n            <ion-icon ios="ios-trash-outline" md="md-trash" color="danger" (click)="deleteMeeting()"></ion-icon>\n          </div>\n        </ion-row>\n      </ion-card-title>\n      <p>{{ concatDays(meeting.days) }} - {{ meeting.time }}</p>\n      <p>Responsáveis: {{ meeting.leaders }}</p>\n      <br>\n      <p>{{ meeting.description }}</p>\n    </ion-card-content>\n    <div id="map"></div>\n    <ion-card-content>\n      <ion-card-title>\n        {{ truncate(meeting.location.display_name) }}\n      </ion-card-title>\n      <p>{{ meeting.place_description }}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/show-meeting/show-meeting.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__meetings_meetings_service__["a" /* MeetingsService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavParams"]])
    ], ShowMeetingPage);
    return ShowMeetingPage;
}());

//# sourceMappingURL=show-meeting.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_service__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectLocationPage = /** @class */ (function () {
    function SelectLocationPage(alertCtrl, loadCtrl, viewCtrl, locationService) {
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.viewCtrl = viewCtrl;
        this.locationService = locationService;
    }
    SelectLocationPage.prototype.ionViewDidEnter = function () {
        this.center = ['-9.6475', '-35.7337'];
        this.loadMap();
    };
    SelectLocationPage.prototype.loadMap = function () {
        this.myMap = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.map('select-map').setView(this.center, 13);
        __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a
            .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17
        })
            .addTo(this.myMap);
        this.markPlace();
        // marker.bindPopup('<p> Leaflet Mapa Funcionando. </p>');
    };
    SelectLocationPage.prototype.markPlace = function () {
        if (this.marker) {
            this.myMap.removeLayer(this.marker);
        }
        this.marker = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.marker(this.center);
        this.myMap.addLayer(this.marker);
    };
    SelectLocationPage.prototype.searchPlace = function (event) {
        var _this = this;
        var loading = this.loadCtrl.create({
            content: 'Buscando...'
        });
        loading.present();
        var query = event.target.value;
        this.locationService.getLocation(query).subscribe(function (data) {
            loading.dismiss();
            _this.placesFound = data;
        }, function (err) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Erro ao cadastrar',
                message: err.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SelectLocationPage.prototype.selectPlace = function (place) {
        this.place = place;
        __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.layerGroup().addTo(this.myMap);
        this.center = [place.lat, place.lon];
        this.myMap.setView(this.center, 15);
        this.markPlace();
    };
    SelectLocationPage.prototype.confirmPlace = function () {
        this.viewCtrl.dismiss({ place: this.place });
        this.myMap.remove();
    };
    SelectLocationPage.prototype.abort = function () {
        this.viewCtrl.dismiss();
        this.myMap.remove();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('select-map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], SelectLocationPage.prototype, "mapContainer", void 0);
    SelectLocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-select-location',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/select-location/select-location.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="abort()">Cancelar</button>\n    </ion-buttons>\n    <ion-title>Selecionar Local</ion-title>\n    <ion-buttons end>\n      <button ion-button [disabled]="!place" (click)="confirmPlace()">Confirmar</button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar (ionInput)="searchPlace($event)" placeholder="Buscar local..."></ion-searchbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div id="select-map"></div>\n  <div *ngIf="place">\n    <h4>Local Selecionado: </h4>\n    <p>{{ place.display_name }}</p>\n  </div>\n  <ion-list *ngIf="placesFound" radio-group [(ngModel)]="place">\n    <ion-list-header>Locais encontrados:</ion-list-header>\n    <ion-item class="places" *ngFor="let place of placesFound">\n      <ion-label>{{ place.display_name }}</ion-label>\n      <ion-radio [value]="place" (ionSelect)="selectPlace($event)"></ion-radio>\n    </ion-item>\n  </ion-list>\n  <div *ngIf="placesFound && placesFound.length === 0">\n    <h6>Nenhum resultado encontrado...</h6>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/select-location/select-location.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_3__location_service__["a" /* LocationService */]])
    ], SelectLocationPage);
    return SelectLocationPage;
}());

//# sourceMappingURL=select-location.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, _authService, navParams, fb, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this._authService = _authService;
        this.navParams = navParams;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.initForms();
    };
    LoginPage.prototype.initForms = function () {
        this.loginForm = this.fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email])],
            password: [
                '',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)])
            ]
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var email = this.loginForm.get('email').value;
        var password = this.loginForm.get('password').value;
        var loading = this.loadingCtrl.create({
            content: 'Entrando...'
        });
        loading.present();
        if (this.loginForm.valid) {
            this._authService
                .login(email, password)
                .then(function (data) {
                loading.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            })
                .catch(function (err) {
                loading.dismiss();
                _this.onLoginError(err);
            });
        }
    };
    LoginPage.prototype.loginGooglePlus = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Entrando...'
        });
        this._authService
            .loginWithGoogle()
            .then(function (data) {
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        })
            .catch(function (err) {
            loading.dismiss();
            _this.onLoginError(err);
        });
    };
    LoginPage.prototype.onLoginError = function (err) {
        var wrongPassword = 'auth/wrong-password';
        var userNotFound = 'auth/user-not-found';
        var errorMessage = 'Tente novamente mais tarde';
        switch (err.code) {
            case wrongPassword:
                errorMessage = 'Senha incorreta';
                break;
            case userNotFound:
                errorMessage = 'Usuário não encontrado';
                break;
        }
        var alert = this.alertCtrl.create({
            title: 'Erro ao entrar',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage.prototype.goToSignUpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/rogacilio/cru-alagoas-ionic/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="loginForm" (ngSubmit)="login()">\n    <ion-item>\n      <ion-label floating [color]="loginForm.get(\'email\').touched && !loginForm.get(\'email\').valid && \'danger\'">E-mail</ion-label>\n      <ion-input type="email" formControlName="email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating [color]="loginForm.get(\'password\').touched && !loginForm.get(\'password\').valid && \'danger\'">Senha</ion-label>\n      <ion-input type="password" minLength="6" formControlName="password"></ion-input>\n    </ion-item>\n    <button ion-button full type="submit" [disabled]="!loginForm.valid">Entrar</button>\n    <button ion-button full type="button" (click)="loginGooglePlus()" color="danger">Entrar com Google</button>\n  </form>\n  <a class="primary" (click)="goToSignUpPage()">Não possuo cadastro!</a>\n</ion-content>'/*ion-inline-end:"/Users/rogacilio/cru-alagoas-ionic/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[375]);
//# sourceMappingURL=main.js.map