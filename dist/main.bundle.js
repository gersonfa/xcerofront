webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/BasesComponent/BaseComponent/GroupsComponent/groups.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\" style=\"height: 80vh;\">\r\n  <div class=\"three wide column\" style=\"border-right: 1px solid black;\">\r\n    <sm-button class=\"fluid yellow\" icon=\"plus\" (click)=\"createGroupModel.show({inverted: false})\">Crear nuevo grupo</sm-button>\r\n    <br>\r\n    <sm-list class=\"divided animated\">\r\n      <sm-item *ngFor=\"let group of groups\" [ngClass]=\"{'item-selected': group.name === group_selected?.name}\" (click)=\"selecte_group(group)\">\r\n        {{group.name}}\r\n      </sm-item>\r\n    </sm-list>\r\n\r\n    <h5 *ngIf=\"groups.length == 0\">\r\n      Aún no hay grupos registrados.\r\n    </h5>\r\n  </div>\r\n\r\n  <div class=\"two wide column\" style=\"border-right: 1px solid black;\">\r\n    <sm-list class=\"divided\">\r\n      <sm-item *ngFor=\"let colony of colonies\">\r\n        <i style=\"color: red; cursor: pointer;\" (click)=\"delete_colony(colony)\">x</i>\r\n        {{colony.label}}\r\n      </sm-item>\r\n    </sm-list>\r\n\r\n    <h5 *ngIf=\"colonies.length == 0 && group_selected\">\r\n      Aún no hay colonias registradas en este grupo.\r\n    </h5>\r\n\r\n    <h5 *ngIf=\"colonies.length == 0 && !group_selected\">\r\n      Selecciona un grupo\r\n    </h5>\r\n  </div>\r\n\r\n  <div class=\"eleven wide column\">\r\n    <h3 *ngIf=\"group_selected\">{{group_selected.name}}</h3>\r\n    <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n      <agm-marker *ngFor=\"let colony of colonies\" [label]=\"colony.label\" [latitude]=\"colony.latitude\" [longitude]=\"colony.longitude\"></agm-marker>\r\n    </agm-map>\r\n    <br>\r\n    <form [formGroup]=\"colonyForm\">\r\n      <div class=\"ui input fluid\" [ngClass]=\"{'disabled': !group_selected}\">\r\n        <input type=\"text\" #search formControlName=\"name\">\r\n      </div>\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<sm-modal title=\"Nuevo grupo\" #createGroupModel>\r\n  <modal-content>\r\n    <div class=\"ui fluid input\">\r\n      <input type=\"text\" [(ngModel)]=\"new_group_name\" placeholder=\"Ingresa nombre de grupo\">\r\n    </div>\r\n  </modal-content>\r\n\r\n  <modal-actions>\r\n    <div class=\"ui buttons\">\r\n      <button class=\"ui negative button\" (click)=\"createGroupModel.hide()\">Cancelar</button>\r\n      <button class=\"ui button primary\" [disabled]=\"!new_group_name\" (click)=\"create_group(); createGroupModel.hide();\" style=\"margin-left: 10px;\">Guardar grupo</button>\r\n    </div>\r\n  </modal-actions>\r\n</sm-modal>\r\n\r\n<style>\r\n  .item-selected {\r\n    background-color: #FFF8E1;\r\n  }\r\n</style>\r\n"

/***/ }),

/***/ "./src/app/BasesComponent/BaseComponent/GroupsComponent/groups.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_group_service__ = __webpack_require__("./src/app/_services/group.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_colony_service__ = __webpack_require__("./src/app/_services/colony.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_snotify__ = __webpack_require__("./node_modules/ng-snotify/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GroupsComponent = /** @class */ (function () {
    function GroupsComponent(groupService, colonyService, route, fb, mapsAPILoader, ngZone, snotifyService) {
        this.groupService = groupService;
        this.colonyService = colonyService;
        this.route = route;
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.snotifyService = snotifyService;
        this.groups = [];
        this.new_group_name = '';
        this.colonies = [];
    }
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 9;
        this.latitude = 18.703139;
        this.longitude = -97.911509;
        this.subscription = this.route.parent.params.subscribe(function (params) {
            _this.base_id = params['id'];
        });
        this.groupService.group_by_base(this.base_id).subscribe(function (groups) {
            _this.groups = groups;
        });
        this.name = this.fb.control('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required);
        this.colonyForm = this.fb.group({
            name: this.name,
            place_id: '',
            lat: '',
            lng: ''
        });
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["(regions)"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    console.log(place);
                    //set latitude, longitude and zoom
                    _this.name.setValue(place.name);
                    _this.colonyForm.value.place_id = place.place_id;
                    _this.colonyForm.value.lat = place.geometry.location.lat();
                    _this.colonyForm.value.lng = place.geometry.location.lng();
                    _this.colonyService.colony_create(_this.group_selected._id, _this.colonyForm.value).subscribe(function (colony) {
                        var marker = {
                            longitude: Number(colony.coords[0]),
                            latitude: Number(colony.coords[1]),
                            label: colony.name,
                            _id: colony._id
                        };
                        _this.colonies.push(marker);
                        _this.colonyForm.reset();
                    }, function (error) {
                        var body = JSON.parse(error._body);
                        console.log(body);
                        if (body.error.includes('duplicate key')) {
                            _this.snotifyService.error('La colonia ya esta registrada.');
                        }
                    });
                });
            });
        });
    };
    GroupsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    GroupsComponent.prototype.create_group = function () {
        var _this = this;
        this.groupService.group_create(this.base_id, { name: this.new_group_name }).subscribe(function (group) {
            _this.groups.push(group);
            _this.new_group_name = '';
        });
    };
    GroupsComponent.prototype.selecte_group = function (group) {
        var _this = this;
        this.group_selected = group;
        this.colonyService.colony_by_group(this.group_selected._id).subscribe(function (colonies) {
            _this.colonies = [];
            colonies.map(function (colony) {
                var marker = {
                    longitude: Number(colony.coords[0]),
                    latitude: Number(colony.coords[1]),
                    label: colony.name,
                    _id: colony._id
                };
                _this.colonies.push(marker);
            });
        });
    };
    GroupsComponent.prototype.delete_colony = function (colony) {
        var _this = this;
        this.colonyService.colony_delete(colony._id).subscribe(function (colony_deleted) { return _this.colonies = _this.colonies.filter(function (c) { return c._id !== colony_deleted._id; }); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], GroupsComponent.prototype, "searchElementRef", void 0);
    GroupsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/BasesComponent/BaseComponent/GroupsComponent/groups.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_group_service__["a" /* GroupService */],
            __WEBPACK_IMPORTED_MODULE_5__services_colony_service__["a" /* ColonyService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_6_ng_snotify__["b" /* SnotifyService */]])
    ], GroupsComponent);
    return GroupsComponent;
}());



/***/ }),

/***/ "./src/app/BasesComponent/BaseComponent/base.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"sixteen wide column\">\r\n    <div class=\"ui large breadcrumb\">\r\n      <a class=\"section\" routerLink=\"/dashboard/bases\">Bases</a>\r\n      <i class=\"right chevron icon divider\"></i>\r\n      <div class=\"active section\">{{base?.name}}</div>\r\n    </div>\r\n    <button class=\"ui red button\" style=\"float: right;\" (click)=\"modal.show()\">Eliminar base</button>\r\n    <div class=\"ui top attached tabular menu\" style=\"margin-top: 2em;\">\r\n      <a class=\"item\" routerLink=\"groups\" routerLinkActive=\"active\">\r\n        Grupos\r\n      </a>\r\n      <a class=\"item\" routerLink=\"places\" routerLinkActive=\"active\">\r\n        Lugares\r\n      </a>\r\n    </div>\r\n    <div class=\"ui bottom attached segment\">\r\n\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<sm-modal class=\"basic\" #modal>\r\n  <modal-content>\r\n      <h2>¿Estás seguro de querer borrar la base?</h2>\r\n      <p>IMPORTANTE: Se eliminaran los grupos, colonias, lugares y tarifas relacionadas a esta base.</p>\r\n  </modal-content>\r\n  <modal-actions>\r\n    <button class=\"ui button\" style=\"margin-right: 10px;\" (click)=\"modal.hide()\">Cancelar</button>\r\n    <button class=\"ui button red\" (click)=\"baseDelete(modal)\">Eliminar</button>\r\n  </modal-actions>\r\n</sm-modal>\r\n"

/***/ }),

/***/ "./src/app/BasesComponent/BaseComponent/base.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_bases_service__ = __webpack_require__("./src/app/_services/bases.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BaseComponent = /** @class */ (function () {
    function BaseComponent(baseService, route, router) {
        this.baseService = baseService;
        this.route = route;
        this.router = router;
    }
    BaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.base_id = params['id']; });
        this.baseService.base_details(this.base_id).subscribe(function (base) { return _this.base = base; });
    };
    BaseComponent.prototype.baseDelete = function (modal) {
        var _this = this;
        this.baseService.base_delete(this.base_id).subscribe(function (base) {
            modal.hide();
            _this.router.navigate(['/dashboard/bases']);
        });
    };
    BaseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/BasesComponent/BaseComponent/base.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_bases_service__["a" /* BaseService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], BaseComponent);
    return BaseComponent;
}());



/***/ }),

/***/ "./src/app/BasesComponent/BaseCreateComponent/base.create.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"ten wide column\">\r\n    <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n        <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></agm-marker>\r\n    </agm-map>\r\n  </div>\r\n  <div class=\"six wide column\">\r\n    <h3>Crear nueva base</h3>\r\n    <form class=\"ui form\" [formGroup]=\"baseForm\">\r\n      <sm-loader [complete]=\"!loading\" class=\"inverted\" text=\"Guardando\"></sm-loader>\r\n\r\n      <div class=\"field\">\r\n        <sm-input label=\"Nombre\" [control]=\"name\" placeholder=\"Nombre base\"></sm-input>\r\n      </div>\r\n      <div class=\"field\">\r\n        <!-- <sm-input label=\"Dirección\" [control]=\"address\" placeholder=\"Dirección base\" #search></sm-input> -->\r\n        <label>Dirección</label>\r\n        <input type=\"text\" formControlName=\"address\" #search>\r\n      </div>\r\n\r\n      <sm-button (click)=\"base_save()\" [disabled]=\"baseForm.invalid\" class=\"primary\">Crear base</sm-button>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/BasesComponent/BaseCreateComponent/base.create.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseCreateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_bases_service__ = __webpack_require__("./src/app/_services/bases.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BaseCreateComponent = /** @class */ (function () {
    function BaseCreateComponent(fb, mapsAPILoader, ngZone, baseService, route) {
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.baseService = baseService;
        this.route = route;
        this.loading = false;
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.zoom = 12;
    }
    BaseCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BaseCreateComponent.prototype, "searchElementRef", void 0);
    BaseCreateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/BasesComponent/BaseCreateComponent/base.create.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_3__services_bases_service__["a" /* BaseService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], BaseCreateComponent);
    return BaseCreateComponent;
}());



/***/ }),

/***/ "./src/app/BasesComponent/bases.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"four wide column\" style=\"max-height: 90vh; overflow-y: scroll;\">\r\n    <sm-list class=\"divided animated\">\r\n      <sm-item *ngFor=\"let base of bases\" [header]=\"base.name\" routerLink=\"/dashboard/base/{{base._id}}\" [ngClass]=\"{'base-selected': base._id == base_selected}\">\r\n        {{base.address}}\r\n      </sm-item>\r\n    </sm-list>\r\n  </div>\r\n  <div class=\"twelve wide column\">\r\n    <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n        <agm-marker (markerClick)=\"selectBase(marker)\" [iconUrl]=\"'assets/base.png'\" [openInfoWindow]=\"true\" *ngFor=\"let marker of markers\" [label]=\"marker.label\" [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"></agm-marker>\r\n    </agm-map>\r\n\r\n    <form class=\"ui form\" [formGroup]=\"baseForm\" style=\"margin-top: 1em;\">\r\n      <sm-loader [complete]=\"!loading\" class=\"inverted\" text=\"Guardando\"></sm-loader>\r\n\r\n      <div class=\"field\">\r\n        <sm-input label=\"Nombre\" [control]=\"name\" placeholder=\"Nombre base\"></sm-input>\r\n      </div>\r\n      <div class=\"field\">\r\n        <!-- <sm-input label=\"Dirección\" [control]=\"address\" placeholder=\"Dirección base\" #search></sm-input> -->\r\n        <label>Dirección</label>\r\n        <input type=\"text\" formControlName=\"address\" #search>\r\n      </div>\r\n\r\n      <sm-button (click)=\"base_save()\" [disabled]=\"baseForm.invalid\" class=\"primary\">Crear base</sm-button>\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n\r\n<style>\r\n  .base-selected {\r\n    border: 1px solid #FFC107;\r\n    padding: 10px !important;\r\n  }\r\n\r\n  agm-map {\r\n    height: 70vh;\r\n  }\r\n</style>\r\n\r\n"

/***/ }),

/***/ "./src/app/BasesComponent/bases.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_bases_service__ = __webpack_require__("./src/app/_services/bases.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BasesComponent = /** @class */ (function () {
    function BasesComponent(fb, mapsAPILoader, ngZone, baseService) {
        this.fb = fb;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.baseService = baseService;
        this.bases = [];
        this.markers = [];
        this.loading = false;
    }
    BasesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 12;
        this.latitude = 19.040034;
        this.longitude = -98.263005;
        this.baseService.base_list().subscribe(function (bases) {
            _this.bases = bases.sort(_this.sortBases);
            _this.bases.map(function (b) {
                var marker = {
                    longitude: Number(b.coords[0]),
                    latitude: Number(b.coords[1]),
                    label: b.name
                };
                _this.markers.push(marker);
            });
        });
        this.name = this.fb.control("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.address = this.fb.control("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.baseForm = this.fb.group({
            name: this.name,
            address: this.address,
            lat: "",
            lng: ""
        });
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.address.setValue(place.formatted_address);
                    //this.latitude = place.geometry.location.lat();
                    _this.baseForm.value.lat = place.geometry.location.lat();
                    //this.longitude = place.geometry.location.lng();
                    _this.baseForm.value.lng = place.geometry.location.lng();
                    _this.zoom = 13;
                });
            });
        });
    };
    BasesComponent.prototype.base_save = function () {
        var _this = this;
        this.baseService.base_create(this.baseForm.value).subscribe(function (base) {
            _this.bases.push(base);
            _this.bases = _this.bases.sort(_this.sortBases);
            var marker = {
                longitude: Number(base.coords[0]),
                latitude: Number(base.coords[1]),
                label: base.name,
                _id: base._id
            };
            _this.markers.push(marker);
            _this.baseForm.reset();
        });
    };
    BasesComponent.prototype.selectBase = function (base) {
        this.base_selected = this.bases.find(function (b) { return b.name == base.label; })._id;
        console.log(base);
    };
    BasesComponent.prototype.sortBases = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BasesComponent.prototype, "searchElementRef", void 0);
    BasesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/BasesComponent/bases.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1__services_bases_service__["a" /* BaseService */]])
    ], BasesComponent);
    return BasesComponent;
}());



/***/ }),

/***/ "./src/app/DashboradComponent/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = "/deep/ .logo-xcero {\r\n  width: 6em !important;\r\n}\r\n\r\n/* /deep/ .ui.inverted.menu .yellow.active.item, .ui.inverted.yellow.menu {\r\n  background-color: #FEEE02;\r\n}\r\n\r\n/deep/ .ui.menu .yellow.active.item, .ui.yellow.menu .active.item {\r\n  border-color: #FEEE02 !important;\r\n} */\r\n"

/***/ }),

/***/ "./src/app/DashboradComponent/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<sm-menu title=\"XCero\" logoClass=\"logo-xcero\" class=\"ui inverted\" logo=\"assets/xcero_oficial.png\">\r\n\r\n  <sm-menu class=\"menu right secondary\">\r\n    <a class=\"item yellow\" sm-item routerLink=\"drivers\" routerLinkActive=\"active\">Conductores</a>\r\n    <a class=\"item yellow\" routerLink=\"tariff\" routerLinkActive=\"active\" sm-item>Tarifas</a>\r\n    <a class=\"item yellow\" sm-item routerLink=\"bases\" routerLinkActive=\"active\">Bases</a>\r\n  </sm-menu>\r\n</sm-menu>\r\n\r\n<router-outlet></router-outlet>\r\n\r\n<style>\r\n  .logo-xcero {\r\n    width: 6em !important;\r\n  }\r\n</style>\r\n"

/***/ }),

/***/ "./src/app/DashboradComponent/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DashboradComponent/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/DashboradComponent/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/MessagesComponent/messages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"row\">\r\n    <div class=\"sixteen wide column\">\r\n        <form class=\"ui reply form\" style=\"margin-bottom: 20px;\">\r\n            <div class=\"field\">\r\n              <textarea cols=\"3\" rows=\"3\" placeholder=\"Ingresa un nuevo mensaje\" name=\"body\" [(ngModel)]=\"body\"></textarea>\r\n            </div>\r\n            <button class=\"ui primary submit labeled icon button\" (click)=\"send()\">\r\n              <i class=\"icon edit\"></i> Enviar mensaje\r\n            </button>\r\n          </form>\r\n\r\n          <div class=\"ui raised segment\" *ngFor=\"let inbox of inboxs\">\r\n            <b>{{inbox.date | date:'dd/MM/yy'}}</b>\r\n            <p>{{\r\n              inbox.body\r\n            }}\r\n            </p>\r\n          </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/MessagesComponent/messages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_drivers_service__ = __webpack_require__("./src/app/_services/drivers.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(route, driversService) {
        this.route = route;
        this.driversService = driversService;
        this.inboxs = [];
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) { return _this.driver_id = params['id']; });
        this.driversService.driver_inbox_list(this.driver_id).subscribe(function (inboxs) { return _this.inboxs = inboxs; });
    };
    MessagesComponent.prototype.send = function () {
        var _this = this;
        if (this.body != null && this.body != '') {
            var inbox = {
                date: (new Date).getTime(),
                body: this.body
            };
            this.driversService.driver_inbox_create(this.driver_id, inbox).subscribe(function (inbox_c) { return _this.inboxs.push(inbox_c); });
        }
    };
    MessagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DriversComponent/DriverComponent/MessagesComponent/messages.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__services_drivers_service__["a" /* DriversService */]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/ServicesComponent/services.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"row\">\r\n    <div class=\"sixteen wide column\">\r\n        <table class=\"ui celled table\">\r\n            <thead>\r\n              <tr>\r\n                <th>Cliente</th>\r\n                <th>Origen</th>\r\n                <th>Destino</th>\r\n                <th>Estado</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let service of services\" [ngClass]=\"{'negative': service.state == 'canceled', 'positive': service.state == 'completed'}\">\r\n                <td>{{service.user?.full_name}}</td>\r\n                <td>{{\r\n                  service.origin_colony ? service.origin_colony?.name : service.origin_place?.name\r\n                  }}</td>\r\n                <td>\r\n                  {{\r\n                    service.destiny_colony ? service.destiny_colony?.name : service.destiny_place?.name\r\n                  }}\r\n                </td>\r\n                <td>{{service.state == 'completed' ? 'Completado' :\r\n                  service.state == 'pending' ? 'Pendiente' :\r\n                  service.state == 'on_the_way' ? 'En camino' :\r\n                  service.state == 'in_progress' ? 'En proceso' : 'Cancelado'\r\n                }}</td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/ServicesComponent/services.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_drivers_service__ = __webpack_require__("./src/app/_services/drivers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ServicesComponent = /** @class */ (function () {
    function ServicesComponent(driversService, route) {
        this.driversService = driversService;
        this.route = route;
        this.services = [];
    }
    ServicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) { return _this.driver_id = params['id']; });
        this.driversService.driver_services(this.driver_id).subscribe(function (services) { return _this.services = services; });
    };
    ServicesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DriversComponent/DriverComponent/ServicesComponent/services.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_drivers_service__["a" /* DriversService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], ServicesComponent);
    return ServicesComponent;
}());



/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/driver.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"row\">\r\n    <div class=\"sixteen wide column\" style=\"margin-bottom: 20px;\">\r\n        <div class=\"ui large breadcrumb\">\r\n            <a class=\"section\" routerLink=\"/dashboard/drivers\">Conductores</a>\r\n            <i class=\"right chevron icon divider\"></i>\r\n            <div class=\"active section\">{{driver?.full_name}}</div>\r\n          </div>\r\n    </div>\r\n\r\n    <div class=\"three wide column\">\r\n      <div class=\"ui card\">\r\n        <div class=\"image\">\r\n          <img src=\"{{driver?.image}}\">\r\n        </div>\r\n        <div class=\"content\">\r\n          <a class=\"header\">{{driver?.full_name}}</a>\r\n          <div class=\"meta\">\r\n            <span class=\"date\">{{driver?.email}}</span>\r\n          </div>\r\n          <div class=\"description\">\r\n              <bar-rating *ngIf=\"driver\" [(rate)]=\"driver.rating\" [max]=\"5\" [readOnly]=\"true\"></bar-rating>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"thirteen wide column\">\r\n      <div class=\"ui tabular menu\">\r\n        <a routerLink=\"services\" routerLinkActive=\"active\" class=\" item\">\r\n          Servicios\r\n        </a>\r\n        <a routerLink=\"inbox\" routerLinkActive=\"active\" class=\"item\">\r\n          Mensajes\r\n        </a>\r\n        <a class=\"item\">\r\n          Comentarios\r\n        </a>\r\n      </div>\r\n\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/DriversComponent/DriverComponent/driver.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_drivers_service__ = __webpack_require__("./src/app/_services/drivers.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DriverComponent = /** @class */ (function () {
    function DriverComponent(route, driverService) {
        this.route = route;
        this.driverService = driverService;
    }
    DriverComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.driver_id = params['id']; });
        this.driverService.driver_details(this.driver_id).subscribe(function (driver) { return _this.driver = driver; });
    };
    DriverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DriversComponent/DriverComponent/driver.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__node_modules_angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__services_drivers_service__["a" /* DriversService */]])
    ], DriverComponent);
    return DriverComponent;
}());



/***/ }),

/***/ "./src/app/DriversComponent/DriverFormComponent/driver.form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui container grid\" style=\"padding-top: 2em;\">\r\n  <div class=\"ten wide column\">\r\n    <form class=\"ui form\" [formGroup]=\"driverForm\">\r\n      <div class=\"field\">\r\n        <label>Nombre completo</label>\r\n        <input type=\"text\" name=\"first-name\" placeholder=\"Nombre completo\" formControlName=\"full_name\">\r\n      </div>\r\n      <div class=\"field\">\r\n        <label>Email</label>\r\n        <input type=\"email\" name=\"email\" placeholder=\"Email\" formControlName=\"email\">\r\n      </div>\r\n      <div class=\"field\">\r\n        <label>Número de unidad</label>\r\n        <input type=\"number\" name=\"unit_number\" placeholder=\"Número de unidad\" formControlName=\"unit_number\">\r\n      </div>\r\n      <div class=\"field\">\r\n        <label>Nombre de usuario</label>\r\n        <input type=\"text\" name=\"full_name\" placeholder=\"Usuario\" formControlName=\"account\">\r\n      </div>\r\n      <div class=\"field\">\r\n        <label>Contraseña</label>\r\n        <input type=\"password\" name=\"password\" placeholder=\"Contraseña\" formControlName=\"password\">\r\n      </div>\r\n      <button class=\"ui yellow button\" [disabled]=\"driverForm.invalid\" (click)=\"create_driver()\">Crear conductor</button>\r\n    </form>\r\n  </div>\r\n  <div class=\"four wide column\">\r\n      <div class=\"field\">\r\n        <img style=\"max-width: 100%; margin-top:10px; display: block; margin-left: auto; margin-right: auto;\" class=\"ui small circular image\" [src]=\"imageURL\" alt=\"\">\r\n        <label id=\"uploader\">\r\n          Selecciona imagen\r\n          <input type=\"file\" name=\"myfile\" [(ngModel)]=\"val\" #image (change)=\"readURL(image, val)\" accept=\"image/*\" />\r\n        </label>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/DriversComponent/DriverFormComponent/driver.form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_snotify__ = __webpack_require__("./node_modules/ng-snotify/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DriverFormComponent = /** @class */ (function () {
    function DriverFormComponent(authenticationService, fb, snotifyService) {
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.snotifyService = snotifyService;
        this.imageURL = "http://via.placeholder.com/250x300";
    }
    DriverFormComponent.prototype.ngOnInit = function () {
        this.account = this.fb.control("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.password = this.fb.control("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.email = this.fb.control("");
        this.full_name = this.fb.control("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.unit_number = this.fb.control('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.role = this.fb.control('Driver', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.image = this.fb.control(this.imageURL, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.driverForm = this.fb.group({
            account: this.account,
            password: this.password,
            email: this.email,
            full_name: this.full_name,
            role: this.role,
            image: this.image,
            unit_number: this.unit_number
        });
    };
    DriverFormComponent.prototype.create_driver = function () {
        var _this = this;
        this.authenticationService.user_create(this.driverForm.value).subscribe(function (driver) {
            _this.driverForm.reset();
            console.log(_this.driverForm.value);
            _this.role.setValue('Driver');
            _this.image.setValue("http://via.placeholder.com/250x300");
            _this.snotifyService.success("Unidad " + driver.user.unit_number + " creado correctamente");
        });
    };
    DriverFormComponent.prototype.readURL = function (input) {
        var _this = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.imageURL = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    DriverFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DriversComponent/DriverFormComponent/driver.form.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3_ng_snotify__["b" /* SnotifyService */]])
    ], DriverFormComponent);
    return DriverFormComponent;
}());



/***/ }),

/***/ "./src/app/DriversComponent/drivers.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui internally celled padded grid\" style=\"height: 92vh;;\">\r\n  <div class=\"four wide column\" style=\"max-height: 100%; overflow-y: scroll;\">\r\n    <sm-button class=\"yellow\" icon=\"plus\" routerLink=\"/dashboard/drivers/create\">Añadir nuevo conductor</sm-button>\r\n\r\n    <table class=\"ui very basic collapsing celled table\" style=\"margin-top: 2em;\">\r\n\r\n      <tbody>\r\n        <tr *ngFor=\"let driver of drivers\">\r\n          <td [ngClass]=\"{'selected-driver': driver_selected == driver._id}\">\r\n            <h4 class=\"ui image header\">\r\n              <!-- <img [src]=\"driver.image\" class=\"ui mini rounded image\" style=\"margin-left: auto; margin-right: auto;\"> -->\r\n              <div class=\"content\">\r\n                {{driver.full_name}} <span class=\"ui mini orange label\" *ngIf=\"driver.inService\">En servicio</span>\r\n                <div class=\"sub header\">Unidad: {{driver.unit_number}}</div>\r\n              </div>\r\n            </h4>\r\n          </td>\r\n          <td>\r\n              <sm-button class=\"\" icon=\"user\" routerLink=\"/dashboard/driver/{{driver._id}}\"></sm-button>\r\n              <sm-button class=\"\" icon=\"zoom in\" (click)=\"zoomDriver(driver)\"></sm-button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div class=\"twelve wide column\">\r\n    <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n      <agm-marker *ngFor=\"let marker of driver_markers\" (markerClick)=\"selectDriver(marker)\" [iconUrl]=\"'https://cdn2.iconfinder.com/data/icons/fatcow/32x32/car_taxi.png'\"\r\n        [label]=\"marker.label\" [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"></agm-marker>\r\n    </agm-map>\r\n  </div>\r\n</div>\r\n\r\n<style>\r\n  agm-map {\r\n    height: 90vh;\r\n  }\r\n\r\n  .selected-driver {\r\n    border: 1px solid #FFC107 !important;\r\n    padding: 10px !important;\r\n  }\r\n</style>\r\n"

/***/ }),

/***/ "./src/app/DriversComponent/drivers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriversComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_drivers_service__ = __webpack_require__("./src/app/_services/drivers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_interval__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/interval.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DriversComponent = /** @class */ (function () {
    function DriversComponent(driversService) {
        this.driversService = driversService;
        this.drivers = [];
        this.driver_markers = [];
    }
    DriversComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 12;
        this.latitude = 19.040034;
        this.longitude = -98.263005;
        this.driversService.drivers_list().subscribe(function (drivers) {
            _this.drivers = drivers.sort(_this.sort);
        });
        this.mapDrivers();
    };
    DriversComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DriversComponent.prototype.mapDrivers = function () {
        var _this = this;
        this.driversService.drivers_location().subscribe(function (drivers) {
            _this.driver_markers = drivers.filter(function (d) { return d.coords; }).map(function (d) {
                if (d.coords) {
                    return {
                        longitude: Number(d.coords[0]),
                        latitude: Number(d.coords[1]),
                        label: d.unit_number.toString()
                    };
                }
            });
            console.log(_this.driver_markers);
        });
        this.sub = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].interval(10000)
            .subscribe(function (val) {
            _this.driversService.drivers_location().subscribe(function (drivers) {
                _this.driver_markers = drivers.filter(function (d) { return d.coords; }).map(function (d) {
                    if (d.coords) {
                        return {
                            longitude: Number(d.coords[0]),
                            latitude: Number(d.coords[1]),
                            label: d.unit_number.toString()
                        };
                    }
                });
                console.log(_this.driver_markers);
            });
        });
    };
    DriversComponent.prototype.selectDriver = function (driver) {
        this.driver_selected = this.drivers.find(function (d) { return driver.label == d.unit_number; })._id;
    };
    DriversComponent.prototype.zoomDriver = function (driver) {
        var driver_s = this.driver_markers.find(function (d) { return d.label == driver.unit_number.toString(); });
        this.longitude = driver_s.longitude;
        this.latitude = driver_s.latitude;
        this.zoom = 18;
    };
    DriversComponent.prototype.sort = function (a, b) {
        if (a.unit_number < b.unit_number) {
            return -1;
        }
        if (a.unit_number > b.unit_number) {
            return 1;
        }
        return 0;
    };
    DriversComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/DriversComponent/drivers.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_drivers_service__["a" /* DriversService */]])
    ], DriversComponent);
    return DriversComponent;
}());



/***/ }),

/***/ "./src/app/LoginComponent/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui middle aligned center aligned grid\" style=\"background-color: #212121; height: 100vh;\">\r\n  <div class=\"column\">\r\n    <h2 class=\"ui teal image header\">\r\n      <img src=\"assets/xcero_oficial.png\" class=\"image\">\r\n    </h2>\r\n    <form class=\"ui large form \" [formGroup]=\"loginForm\">\r\n      <div class=\"ui stacked segment\">\r\n        <div class=\"field \">\r\n          <div class=\"ui left icon input\">\r\n            <i class=\"user icon\"></i>\r\n            <input type=\"text\" name=\"account\" placeholder=\"Nombre de usuario\" formControlName=\"account\">\r\n          </div>\r\n        </div>\r\n        <div class=\"field \">\r\n          <div class=\"ui left icon input\">\r\n            <i class=\"lock icon\"></i>\r\n            <input type=\"password\" name=\"password\" placeholder=\"Contraseña\" formControlName=\"password\">\r\n          </div>\r\n        </div>\r\n        <button class=\"ui fluid large yellow submit button\" [disabled]=\"loginForm.invalid || loading\" (click)=\"localLogin()\">Iniciar sesión</button>\r\n      </div>\r\n\r\n      <div class=\"ui error message\" *ngIf=\"errorMessage\">\r\n        <p>{{errorMessage}}</p>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n</div>\r\n\r\n<style>\r\n  body {\r\n    background-color: #DADADA;\r\n  }\r\n\r\n  body>.grid {\r\n    height: 100%;\r\n  }\r\n\r\n  .image {\r\n    margin-top: -100px;\r\n  }\r\n\r\n  .column {\r\n    max-width: 450px;\r\n  }\r\n\r\n</style>\r\n"

/***/ }),

/***/ "./src/app/LoginComponent/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(authenticationService, fb, router) {
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.router = router;
        this.error = false;
        this.loading = false;
        this.errorMessage = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.account = this.fb.control('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.password = this.fb.control('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required);
        this.loginForm = this.fb.group({
            account: this.account,
            password: this.password
        });
    };
    LoginComponent.prototype.localLogin = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.localLogin(this.loginForm.value).subscribe(function (response) {
            _this.loading = false;
            var role = response.user.role;
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            _this.router.navigate(['/dashboard']);
        }, function (error) {
            _this.loading = false;
            if (error._body == 'Unauthorized') {
                _this.error = true;
                _this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
            }
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/LoginComponent/login.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/PlacesComponent/places.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui padded grid\">\r\n  <div class=\"four wide column\">\r\n\r\n    <div class=\"ui list\">\r\n        <div class=\"item\" *ngFor=\"let place of places\">\r\n          <div class=\"header\"> <i style=\"color: red; cursor: pointer;\" (click)=\"selectPlace(place); modal.show()\">x</i> {{place.name}}</div>\r\n          {{place.address}}\r\n        </div>\r\n      </div>\r\n\r\n    <h5 *ngIf=\"places.length == 0\">Aún no hay lugares registrados.</h5>\r\n  </div>\r\n  <div class=\"twelve wide column\">\r\n    <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n      <agm-marker *ngFor=\"let marker of markers\" [label]=\"marker.label\" [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"></agm-marker>\r\n    </agm-map>\r\n\r\n    <form class=\"ui form\" style=\"margin-top: 1em;\">\r\n        <div class=\"field\">\r\n          <label>Nombre</label>\r\n          <input type=\"text\" name=\"place_name\" [(ngModel)]=\"place_name\" placeholder=\"Nombre lugar\">\r\n        </div>\r\n\r\n        <div class=\"field\">\r\n          <label>Dirección</label>\r\n          <input type=\"text\" #search placeholder=\"Nuevo lugar\">\r\n        </div>\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n\r\n<sm-modal class=\"basic\" #modal>\r\n    <modal-content *ngIf=\"place_selected\">\r\n        <h2>¿Estás seguro de querer borrar {{place_selected.name}}?</h2>\r\n        <p>Se borrarán todas las tarifas relacionadas a este lugar.</p>\r\n    </modal-content>\r\n    <modal-actions>\r\n      <button class=\"ui button\" style=\"margin-right: 10px;\" (click)=\"modal.hide()\">Cancelar</button>\r\n      <button class=\"ui button red\" (click)=\"deletePlace(modal)\">Eliminar</button>\r\n    </modal-actions>\r\n  </sm-modal>\r\n"

/***/ }),

/***/ "./src/app/PlacesComponent/places.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_places_service__ = __webpack_require__("./src/app/_services/places.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlacesComponent = /** @class */ (function () {
    function PlacesComponent(placeService, mapsAPILoader, ngZone, route) {
        this.placeService = placeService;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.route = route;
        this.places = [];
        this.markers = [];
    }
    PlacesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 9;
        this.latitude = 18.703139;
        this.longitude = -97.911509;
        this.route.parent.params.subscribe(function (params) { return _this.base_id = params['id']; });
        this.placeService.places_by_base(this.base_id).subscribe(function (places) {
            _this.places = places;
            _this.places.map(function (place) {
                var marker = {
                    longitude: Number(place.coords[0]),
                    latitude: Number(place.coords[1]),
                    label: place.name
                };
                _this.markers.push(marker);
            });
        });
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    var new_place = {
                        name: _this.place_name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        address: place.formatted_address,
                        place_id: place.id,
                        base: _this.base_id
                    };
                    _this.placeService.place_create(_this.base_id, new_place).subscribe(function (place_created) {
                        var marker = {
                            longitude: place.geometry.location.lng(),
                            latitude: place.geometry.location.lat(),
                            label: place.name
                        };
                        _this.markers.push(marker);
                        _this.places.push(place_created);
                        _this.place_name = "";
                        _this.searchElementRef.nativeElement.value = "";
                    });
                });
            });
        });
    };
    PlacesComponent.prototype.selectPlace = function (place) {
        this.place_selected = place;
    };
    PlacesComponent.prototype.deletePlace = function (modal) {
        var _this = this;
        this.placeService.place_delete(this.base_id, this.place_selected._id).subscribe(function (place) {
            _this.places = _this.places.filter(function (p) { return p._id != place._id; });
            modal.hide();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], PlacesComponent.prototype, "searchElementRef", void 0);
    PlacesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/PlacesComponent/places.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_places_service__["a" /* PlacesService */],
            __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]])
    ], PlacesComponent);
    return PlacesComponent;
}());



/***/ }),

/***/ "./src/app/TariffComponent/tariff.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui internally celled padded grid\" style=\"height: 94vh;;\">\r\n  <div class=\"row\">\r\n    <div class=\"four wide column\">\r\n\r\n      <div class=\"ui form\">\r\n\r\n        <h4 class=\"ui dividing header\">Nueva tarifa</h4>\r\n\r\n        <div class=\"field\">\r\n          <select [(ngModel)]=\"group_selected\" (change)=\"selectGroup()\">\r\n            <option value=\"\">Selecciona un grupo o lugar de origen</option>\r\n            <option *ngFor=\"let gp of groups_places\" [value]=\"gp._id\">{{gp.base + ' - ' + gp.name}}</option>\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\"ui active centered inline loader\" style=\"margin-top: 20px;\" *ngIf=\"loading_available\"></div>\r\n\r\n        <div class=\"field\" *ngIf=\"group_selected && groups_places_available.length > 0 && !loading_available\">\r\n          <select [(ngModel)]=\"second_group_selected\">\r\n            <option value=\"\">Selecciona un grupo o lugar de destino</option>\r\n            <option *ngFor=\"let gp of groups_places_available\" [value]=\"gp._id\">{{gp.base + ' - ' + gp.name}}</option>\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\" field\" *ngIf=\"second_group_selected && !loading_available\">\r\n          <input type=\"number\" placeholder=\"Costo\" [(ngModel)]=\"cost\">\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <!-- <sm-select [(model)]=\"group_selected\" (onChange)=\"selectGroup($event)\" placeholder=\"Buscar grupo o lugar\" class=\"fluid search\">\r\n        <option *ngFor=\"let gp of groups_places\" [value]=\"gp._id\">{{gp.name}}</option>\r\n      </sm-select>\r\n\r\n      <br>\r\n\r\n      <sm-select [(model)]=\"second_group_selected\" placeholder=\"Buscar grupo o lugar\" class=\"fluid search\">\r\n        <option *ngFor=\"let gp of groups_places_available\" [value]=\"gp._id\">{{gp.name}}</option>\r\n      </sm-select>\r\n\r\n      <br> -->\r\n\r\n      <button class=\"ui button yellow\" style=\"margin-top: 10px;\" [disabled]=\"!group_selected || !second_group_selected || !cost\"\r\n        (click)=\"saveTariff()\">\r\n        Guardar\r\n      </button>\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"twelve wide column\">\r\n      <!-- <div class=\"ui buttons\" style=\"float: right;\" *ngIf=\"tariffs.length > 0\">\r\n        <button class=\"ui yellow button\" (click)=\"updatemodal.show(); select_quantity = true;\">Actualizar por cantidad</button>\r\n        <div class=\"or\" data-text=\"ó\"></div>\r\n        <button class=\"ui yellow button\" (click)=\"updatemodal.show(); select_percentage = true;\">Actualizar por porcentaje</button>\r\n      </div> -->\r\n\r\n      <sm-dropdown title=\"Editar globalmente\" class=\"pointing floating labeled icon button yellow\">\r\n          <sm-item (click)=\"updatemodal.show(); select_quantity = true;\">Actualizar por cantidad</sm-item>\r\n          <sm-item (click)=\"updatemodal.show(); select_percentage = true;\">Actualizar por porcentaje</sm-item>\r\n      </sm-dropdown>\r\n\r\n      <div class=\"ui section divider\" style=\"clear: both;\" *ngIf=\"tariffs.length > 0\"></div>\r\n\r\n      <div class=\"ui middle aligned divided list\">\r\n        <div class=\"item\" *ngFor=\"let tariff of tariffs\">\r\n          <div class=\"right floated content\">\r\n            <span>{{tariff.cost | currency:'MXN':'symbol-narrow'}} &nbsp; &nbsp;</span>\r\n            <sm-button class=\"\" icon=\"pencil\" (click)=\"edit.show(); selected_tariff = tariff;\"></sm-button>\r\n            <sm-button class=\"negative\" icon=\"trash\" (click)=\"deleteTariff(tariff._id)\"></sm-button>\r\n          </div>\r\n          <div class=\"content\">\r\n            <p>\r\n              {{ tariff.origin_group ? tariff.origin_group?.base.name + ' - ' + tariff.origin_group?.name  : tariff.origin_place?.base.name + ' - ' + tariff.origin_place?.name }}\r\n              <b style=\"font-size: 1.2em;\"><--></b>\r\n                {{tariff.destiny_group ? tariff.destiny_group?.base.name + ' - ' + tariff.destiny_group?.name  : tariff.destiny_place?.base.name + ' - ' + tariff.destiny_place?.name\r\n                }}\r\n            </p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <sm-modal class=\"\" #edit>\r\n    <modal-content>\r\n      <div *ngIf=\"selected_tariff\">\r\n        <h3>\r\n          {{selected_tariff.origin_group ? selected_tariff.origin_group?.name + ' - ' + selected_tariff.origin_group?.base.name : selected_tariff.origin_place?.name\r\n          + ' - ' + selected_tariff.origin_place?.base.name}}\r\n          <==>\r\n            {{selected_tariff.destiny_group ? selected_tariff.destiny_group?.name + ' - ' + selected_tariff.destiny_group?.base.name\r\n            : selected_tariff.destiny_place?.name + ' - ' + selected_tariff.destiny_place?.base.name}}\r\n        </h3>\r\n\r\n        <div class=\"ui form\">\r\n          <div class=\"fluid field\">\r\n            <input type=\"number\" placeholder=\"Costo\" [(ngModel)]=\"selected_tariff.cost\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </modal-content>\r\n    <modal-actions>\r\n      <div class=\"ui buttons\">\r\n        <div class=\"ui button negative\" (click)=\"edit.hide()\">Cancelar</div>\r\n        <div class=\"ui button primary\" (click)=\"editTariff(edit)\" style=\"margin-left: 10px;\">Guardar cambios</div>\r\n      </div>\r\n    </modal-actions>\r\n  </sm-modal>\r\n\r\n  <sm-modal class=\"\" #updatemodal>\r\n    <modal-content>\r\n      <div>\r\n        <h3 *ngIf=\"select_quantity\">\r\n          Actualizar por cantidad\r\n        </h3>\r\n\r\n        <h3 *ngIf=\"select_percentage\">\r\n          Actualizar por porcentaje\r\n        </h3>\r\n\r\n        <div class=\"ui form\">\r\n          <div class=\"fluid field\">\r\n            <input type=\"number\" placeholder=\"Cantidad a sumar\" *ngIf=\"select_quantity\" [(ngModel)]=\"update_type.quantity\">\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"ui form\">\r\n          <div class=\"fluid field\">\r\n            <input type=\"number\" placeholder=\"Porcentaje a sumar\" *ngIf=\"select_percentage\" [(ngModel)]=\"update_type.percentage\">\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </modal-content>\r\n    <modal-actions>\r\n      <div class=\"ui buttons\">\r\n        <div class=\"ui button negative\" (click)=\"updatemodal.hide(); select_quantity = false; select_percentage = false;\">Cancelar</div>\r\n        <div class=\"ui button primary\" [ngClass]=\"{'loading': loading_all, 'disabled': loading_all}\" (click)=\"updateAll(updatemodal)\" style=\"margin-left: 10px;\">Guardar cambios</div>\r\n      </div>\r\n    </modal-actions>\r\n  </sm-modal>\r\n\r\n</div>\r\n\r\n<style>\r\n  .ui.active.dimmer.modals.transition {\r\n    display: flex !important;\r\n    display: -ms-flexbox !important;\r\n  }\r\n</style>\r\n"

/***/ }),

/***/ "./src/app/TariffComponent/tariff.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TariffComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_group_service__ = __webpack_require__("./src/app/_services/group.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_tariff_service__ = __webpack_require__("./src/app/_services/tariff.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TariffComponent = /** @class */ (function () {
    function TariffComponent(groupService, tariffService) {
        this.groupService = groupService;
        this.tariffService = tariffService;
        this.groups_places = [];
        this.group_selected = "";
        this.groups_places_available = [];
        this.second_group_selected = "";
        this.select_percentage = false;
        this.select_quantity = false;
        this.update_type = {};
        this.tariffs = [];
    }
    TariffComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupService.group_place_list().subscribe(function (groups_places) {
            _this.groups_places = groups_places.sort(_this.sort);
        });
        this.tariffService.tariff_list().subscribe(function (tariffs) {
            _this.tariffs = tariffs.sort(_this.sortTariffs);
        });
    };
    TariffComponent.prototype.sortTariffs = function (a, b) {
        var aproperty1 = a.origin_group ? a.origin_group : a.origin_place;
        var aproperty2 = aproperty1.base.name;
        var bproperty1 = b.origin_group ? b.origin_group : b.origin_place;
        var bproperty2 = bproperty1.base.name;
        if (aproperty1.name < bproperty1.name) {
            return -1;
        }
        if (aproperty1.name > bproperty1.name) {
            return 1;
        }
        if (aproperty1.name === bproperty1.name) {
            if (aproperty2 < bproperty2) {
                return -1;
            }
            if (aproperty2 > bproperty2) {
                return 1;
            }
            return 0;
        }
    };
    TariffComponent.prototype.selectGroup = function () {
        var _this = this;
        if (this.group_selected === "") {
            return;
        }
        var gp = this.groups_places.find(function (g) { return g._id === _this.group_selected; });
        var params = {};
        if (gp.type === "group") {
            params = { group_id: gp._id };
        }
        else {
            params = { place_id: gp._id };
        }
        this.loading_available = true;
        this.groupService.group_list_available(params).subscribe(function (groups_places) {
            _this.groups_places_available = groups_places.sort(_this.sort);
            _this.loading_available = false;
        });
    };
    TariffComponent.prototype.saveTariff = function () {
        var _this = this;
        console.log(this.group_selected);
        var gp1 = this.groups_places.find(function (gp) { return gp._id === _this.group_selected; });
        var gp2 = this.groups_places_available.find(function (gp) { return gp._id === _this.second_group_selected; });
        var tariff = {};
        if (gp1.type === "group") {
            if (gp2.type === "group") {
                tariff = {
                    origin_group: gp1._id,
                    destiny_group: gp2._id,
                    cost: this.cost
                };
            }
            else {
                tariff = {
                    origin_group: gp1._id,
                    destiny_place: gp2._id,
                    cost: this.cost
                };
            }
        }
        else {
            if (gp2.type === "group") {
                tariff = {
                    origin_group: gp2._id,
                    destiny_place: gp1._id,
                    cost: this.cost
                };
            }
            else {
                tariff = {
                    origin_place: gp1._id,
                    destiny_place: gp2._id,
                    cost: this.cost
                };
            }
        }
        console.log(tariff);
        this.tariffService
            .tariff_create(tariff)
            .subscribe(function (tariff_created) {
            _this.tariffs.push(tariff_created);
            _this.tariffs = _this.tariffs.sort(_this.sortTariffs);
            _this.cost = null;
            _this.group_selected = "";
            _this.second_group_selected = "";
        });
    };
    TariffComponent.prototype.deleteTariff = function (tariffId) {
        var _this = this;
        this.tariffService.tariff_delete(tariffId).subscribe(function (tariff) {
            _this.tariffs = _this.tariffs.filter(function (t) { return t._id !== tariff._id; });
        });
    };
    TariffComponent.prototype.editTariff = function (modal) {
        var _this = this;
        this.tariffService.tariff_update(this.selected_tariff).subscribe(function (tariff) {
            _this.tariffs = _this.tariffs.map(function (t) {
                if (t._id === tariff._id) {
                    t = tariff;
                }
                return t;
            });
            modal.hide();
        });
    };
    TariffComponent.prototype.updateAll = function (modal) {
        var _this = this;
        this.loading_all = true;
        this.tariffService
            .tariff_update_all(this.update_type)
            .subscribe(function (tariffs) {
            _this.tariffs = tariffs;
            _this.tariffs = tariffs.sort(_this.sortTariffs);
            _this.select_percentage = false;
            _this.select_quantity = false;
            _this.update_type = {};
            _this.loading_all = false;
            modal.hide();
        });
    };
    TariffComponent.prototype.sort = function (a, b) {
        if (a.base < b.base) {
            return -1;
        }
        if (a.base > b.base) {
            return 1;
        }
        return 0;
    };
    TariffComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/TariffComponent/tariff.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_group_service__["a" /* GroupService */],
            __WEBPACK_IMPORTED_MODULE_2__services_tariff_service__["a" /* TariffService */]])
    ], TariffComponent);
    return TariffComponent;
}());



/***/ }),

/***/ "./src/app/_guards/authentication.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        var token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_services/API_URL.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_URL; });
//export const API_URL = 'http://45.33.55.120';
var API_URL = 'http://45.56.121.162';


/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
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
    function AuthenticationService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ "Content-Type": "application/json" });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: this.headers });
    }
    AuthenticationService.prototype.localLogin = function (credentials) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__API_URL__["a" /* API_URL */] + "/api/auth/login", JSON.stringify(credentials), this.options)
            .map(function (response) { return response.json(); });
    };
    AuthenticationService.prototype.user_create = function (driver) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__API_URL__["a" /* API_URL */] + "/api/auth/register", driver)
            .map(function (r) { return r.json(); });
    };
    AuthenticationService.prototype.logOut = function () {
        localStorage.clear();
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/_services/bases.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BaseService = /** @class */ (function () {
    function BaseService(http) {
        this.http = http;
    }
    BaseService.prototype.base_create = function (base) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base", base)
            .map(function (r) { return r.json(); });
    };
    BaseService.prototype.base_details = function (baseId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId)
            .map(function (r) { return r.json(); });
    };
    BaseService.prototype.base_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base")
            .map(function (r) { return r.json(); });
    };
    BaseService.prototype.base_delete = function (baseId) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId)
            .map(function (r) { return r.json(); });
    };
    BaseService.prototype.group_create = function (group) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group", group)
            .map(function (r) { return r.json(); });
    };
    BaseService.prototype.group_list = function (baseId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group")
            .map(function (r) { return r.json(); });
    };
    BaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], BaseService);
    return BaseService;
}());



/***/ }),

/***/ "./src/app/_services/colony.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColonyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColonyService = /** @class */ (function () {
    function ColonyService(http) {
        this.http = http;
    }
    ColonyService.prototype.colony_create = function (groupId, colony) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/" + groupId + "/colony", colony)
            .map(function (r) { return r.json(); });
    };
    ColonyService.prototype.colony_by_group = function (groupId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/" + groupId + "/colony")
            .map(function (r) { return r.json(); });
    };
    ColonyService.prototype.colony_delete = function (colony_id) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/colony/" + colony_id)
            .map(function (r) { return r.json(); });
    };
    ColonyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], ColonyService);
    return ColonyService;
}());



/***/ }),

/***/ "./src/app/_services/drivers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriversService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DriversService = /** @class */ (function () {
    function DriversService(http) {
        this.http = http;
    }
    DriversService.prototype.drivers_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/user/drivers")
            .map(function (r) { return r.json(); });
    };
    DriversService.prototype.drivers_location = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/user/location")
            .map(function (r) { return r.json(); });
    };
    DriversService.prototype.driver_details = function (driver_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/user/" + driver_id + "/driver_details")
            .map(function (r) { return r.json(); });
    };
    DriversService.prototype.driver_services = function (driver_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/service/driver/" + driver_id)
            .map(function (r) { return r.json(); });
    };
    DriversService.prototype.driver_inbox_create = function (driver_id, inbox) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/driver/" + driver_id + "/inbox", inbox)
            .map(function (r) { return r.json(); });
    };
    DriversService.prototype.driver_inbox_list = function (driver_id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/driver/" + driver_id + "/inbox")
            .map(function (r) { return r.json(); });
    };
    DriversService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], DriversService);
    return DriversService;
}());



/***/ }),

/***/ "./src/app/_services/group.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupService = /** @class */ (function () {
    function GroupService(http) {
        this.http = http;
    }
    GroupService.prototype.group_by_base = function (baseId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId + "/group")
            .map(function (r) { return r.json(); });
    };
    GroupService.prototype.group_create = function (baseId, group) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId + "/group", group)
            .map(function (r) { return r.json(); });
    };
    GroupService.prototype.group_list_available = function (gp) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/place/available", { params: gp })
            .map(function (r) { return r.json(); });
    };
    GroupService.prototype.group_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group")
            .map(function (r) { return r.json(); });
    };
    GroupService.prototype.group_place_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/place")
            .map(function (r) { return r.json(); });
    };
    GroupService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], GroupService);
    return GroupService;
}());



/***/ }),

/***/ "./src/app/_services/places.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlacesService = /** @class */ (function () {
    function PlacesService(http) {
        this.http = http;
    }
    PlacesService.prototype.places_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/place")
            .map(function (r) { return r.json(); });
    };
    PlacesService.prototype.places_by_base = function (baseId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId + "/place")
            .map(function (r) { return r.json(); });
    };
    PlacesService.prototype.place_create = function (baseId, place) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId + "/place", place)
            .map(function (r) { return r.json(); });
    };
    PlacesService.prototype.place_delete = function (baseId, placeId) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/base/" + baseId + "/place/" + placeId)
            .map(function (r) { return r.json(); });
    };
    PlacesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], PlacesService);
    return PlacesService;
}());



/***/ }),

/***/ "./src/app/_services/site.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SiteService = /** @class */ (function () {
    function SiteService(http) {
        this.http = http;
    }
    SiteService.prototype.sites_by_group = function (groupId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/" + groupId + "/site")
            .map(function (r) { return r.json(); });
    };
    SiteService.prototype.site_create = function (groupId, site) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__services_API_URL__["a" /* API_URL */] + "/api/group/" + groupId + "/site", site)
            .map(function (r) { return r.json(); });
    };
    SiteService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], SiteService);
    return SiteService;
}());



/***/ }),

/***/ "./src/app/_services/tariff.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TariffService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__API_URL__ = __webpack_require__("./src/app/_services/API_URL.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TariffService = /** @class */ (function () {
    function TariffService(http) {
        this.http = http;
    }
    TariffService.prototype.tariff_create = function (tariff) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__API_URL__["a" /* API_URL */] + "/api/tariff", tariff)
            .map(function (r) { return r.json(); });
    };
    TariffService.prototype.tariff_list = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__API_URL__["a" /* API_URL */] + "/api/tariff")
            .map(function (r) { return r.json(); });
    };
    TariffService.prototype.tariff_delete = function (tariffId) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_2__API_URL__["a" /* API_URL */] + "/api/tariff/" + tariffId)
            .map(function (r) { return r.json(); });
    };
    TariffService.prototype.tariff_update = function (tariff) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__API_URL__["a" /* API_URL */] + "/api/tariff/" + tariff._id, tariff)
            .map(function (r) { return r.json(); });
    };
    TariffService.prototype.tariff_update_all = function (quantity) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__API_URL__["a" /* API_URL */] + "/api/tariff/update/all", quantity)
            .map(function (r) { return r.json(); });
    };
    TariffService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], TariffService);
    return TariffService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "agm-map {\r\n    height: 400px;\r\n  }\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n<ng-snotify></ng-snotify>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_semantic__ = __webpack_require__("./node_modules/ng-semantic/ng-semantic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_semantic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_semantic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bar_rating__ = __webpack_require__("./node_modules/ngx-bar-rating/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__LoginComponent_login_component__ = __webpack_require__("./src/app/LoginComponent/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__guards_authentication_guard__ = __webpack_require__("./src/app/_guards/authentication.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__DashboradComponent_dashboard_component__ = __webpack_require__("./src/app/DashboradComponent/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__BasesComponent_bases_component__ = __webpack_require__("./src/app/BasesComponent/bases.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__BasesComponent_BaseCreateComponent_base_create_component__ = __webpack_require__("./src/app/BasesComponent/BaseCreateComponent/base.create.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_bases_service__ = __webpack_require__("./src/app/_services/bases.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__BasesComponent_BaseComponent_base_component__ = __webpack_require__("./src/app/BasesComponent/BaseComponent/base.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_group_service__ = __webpack_require__("./src/app/_services/group.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_colony_service__ = __webpack_require__("./src/app/_services/colony.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__TariffComponent_tariff_component__ = __webpack_require__("./src/app/TariffComponent/tariff.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_tariff_service__ = __webpack_require__("./src/app/_services/tariff.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__DriversComponent_drivers_component__ = __webpack_require__("./src/app/DriversComponent/drivers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__DriversComponent_DriverFormComponent_driver_form_component__ = __webpack_require__("./src/app/DriversComponent/DriverFormComponent/driver.form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_drivers_service__ = __webpack_require__("./src/app/_services/drivers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_places_service__ = __webpack_require__("./src/app/_services/places.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__PlacesComponent_places_component__ = __webpack_require__("./src/app/PlacesComponent/places.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_site_service__ = __webpack_require__("./src/app/_services/site.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__BasesComponent_BaseComponent_GroupsComponent_groups_component__ = __webpack_require__("./src/app/BasesComponent/BaseComponent/GroupsComponent/groups.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ng_snotify__ = __webpack_require__("./node_modules/ng-snotify/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__DriversComponent_DriverComponent_driver_component__ = __webpack_require__("./src/app/DriversComponent/DriverComponent/driver.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__DriversComponent_DriverComponent_ServicesComponent_services_component__ = __webpack_require__("./src/app/DriversComponent/DriverComponent/ServicesComponent/services.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__DriversComponent_DriverComponent_MessagesComponent_messages_component__ = __webpack_require__("./src/app/DriversComponent/DriverComponent/MessagesComponent/messages.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthConfig"]({
        headerPrefix: 'BEARER',
        globalHeaders: [{ 'Content-Type': 'application/json' }]
    }), http, options);
}
var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_10__LoginComponent_login_component__["a" /* LoginComponent */] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_13__DashboradComponent_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__guards_authentication_guard__["a" /* AuthGuard */]], children: [
            { path: '', redirectTo: 'drivers', pathMatch: 'full' },
            { path: 'bases', component: __WEBPACK_IMPORTED_MODULE_14__BasesComponent_bases_component__["a" /* BasesComponent */] },
            { path: 'bases/new', component: __WEBPACK_IMPORTED_MODULE_15__BasesComponent_BaseCreateComponent_base_create_component__["a" /* BaseCreateComponent */] },
            { path: 'base/:id', component: __WEBPACK_IMPORTED_MODULE_17__BasesComponent_BaseComponent_base_component__["a" /* BaseComponent */], children: [
                    { path: '', redirectTo: 'groups', pathMatch: 'full' },
                    { path: 'groups', component: __WEBPACK_IMPORTED_MODULE_28__BasesComponent_BaseComponent_GroupsComponent_groups_component__["a" /* GroupsComponent */] },
                    { path: 'places', component: __WEBPACK_IMPORTED_MODULE_26__PlacesComponent_places_component__["a" /* PlacesComponent */] }
                ] },
            { path: 'tariff', component: __WEBPACK_IMPORTED_MODULE_20__TariffComponent_tariff_component__["a" /* TariffComponent */] },
            { path: 'drivers', component: __WEBPACK_IMPORTED_MODULE_22__DriversComponent_drivers_component__["a" /* DriversComponent */] },
            { path: 'drivers/create', component: __WEBPACK_IMPORTED_MODULE_23__DriversComponent_DriverFormComponent_driver_form_component__["a" /* DriverFormComponent */] },
            { path: 'driver/:id', component: __WEBPACK_IMPORTED_MODULE_30__DriversComponent_DriverComponent_driver_component__["a" /* DriverComponent */], children: [
                    { path: '', redirectTo: 'services', pathMatch: 'full' },
                    { path: 'services', component: __WEBPACK_IMPORTED_MODULE_31__DriversComponent_DriverComponent_ServicesComponent_services_component__["a" /* ServicesComponent */] },
                    { path: 'inbox', component: __WEBPACK_IMPORTED_MODULE_32__DriversComponent_DriverComponent_MessagesComponent_messages_component__["a" /* MessagesComponent */] }
                ] },
            { path: 'places', component: __WEBPACK_IMPORTED_MODULE_26__PlacesComponent_places_component__["a" /* PlacesComponent */] }
        ] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__LoginComponent_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_13__DashboradComponent_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_14__BasesComponent_bases_component__["a" /* BasesComponent */],
                __WEBPACK_IMPORTED_MODULE_15__BasesComponent_BaseCreateComponent_base_create_component__["a" /* BaseCreateComponent */],
                __WEBPACK_IMPORTED_MODULE_17__BasesComponent_BaseComponent_base_component__["a" /* BaseComponent */],
                __WEBPACK_IMPORTED_MODULE_20__TariffComponent_tariff_component__["a" /* TariffComponent */],
                __WEBPACK_IMPORTED_MODULE_22__DriversComponent_drivers_component__["a" /* DriversComponent */],
                __WEBPACK_IMPORTED_MODULE_23__DriversComponent_DriverFormComponent_driver_form_component__["a" /* DriverFormComponent */],
                __WEBPACK_IMPORTED_MODULE_30__DriversComponent_DriverComponent_driver_component__["a" /* DriverComponent */],
                __WEBPACK_IMPORTED_MODULE_26__PlacesComponent_places_component__["a" /* PlacesComponent */],
                __WEBPACK_IMPORTED_MODULE_28__BasesComponent_BaseComponent_GroupsComponent_groups_component__["a" /* GroupsComponent */],
                __WEBPACK_IMPORTED_MODULE_31__DriversComponent_DriverComponent_ServicesComponent_services_component__["a" /* ServicesComponent */],
                __WEBPACK_IMPORTED_MODULE_32__DriversComponent_DriverComponent_MessagesComponent_messages_component__["a" /* MessagesComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ng_semantic__["NgSemanticModule"],
                __WEBPACK_IMPORTED_MODULE_29_ng_snotify__["a" /* SnotifyModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bar_rating__["a" /* BarRatingModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_router__["c" /* RouterModule */].forRoot(routes, { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_4__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyAogodmHuA-P4Ais69knDP1HBlLOWCrCdg',
                    libraries: ['places']
                })
            ],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
                    useFactory: authHttpServiceFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]]
                },
                __WEBPACK_IMPORTED_MODULE_11__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_12__guards_authentication_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_16__services_bases_service__["a" /* BaseService */],
                __WEBPACK_IMPORTED_MODULE_18__services_group_service__["a" /* GroupService */],
                __WEBPACK_IMPORTED_MODULE_19__services_colony_service__["a" /* ColonyService */],
                __WEBPACK_IMPORTED_MODULE_21__services_tariff_service__["a" /* TariffService */],
                __WEBPACK_IMPORTED_MODULE_24__services_drivers_service__["a" /* DriversService */],
                __WEBPACK_IMPORTED_MODULE_25__services_places_service__["a" /* PlacesService */],
                __WEBPACK_IMPORTED_MODULE_27__services_site_service__["a" /* SiteService */],
                { provide: 'SnotifyToastConfig', useValue: __WEBPACK_IMPORTED_MODULE_29_ng_snotify__["c" /* ToastDefaults */] },
                __WEBPACK_IMPORTED_MODULE_29_ng_snotify__["b" /* SnotifyService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map