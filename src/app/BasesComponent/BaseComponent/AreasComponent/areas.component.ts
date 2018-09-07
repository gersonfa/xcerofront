import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { LatLngLiteral, GoogleMapsAPIWrapper } from "@agm/core";
import { AreaService } from "../../../_services/area.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './areas.component.html'
})

export class AreasComponent implements OnInit, OnDestroy {
  zoom = 15;
  latitude = 19.0443254;
  longitude = -98.2019682;

  group_id: string;
  sub: any;

  paths: LatLngLiteral[] = [
    {lat: 19.045198, lng: -98.200123 },
    {lat: 19.042277, lng: -98.192656 },
    {lat: 19.035421, lng: -98.198235}
  ];

  polygon: any;
  polygons: any[] = [];
  name: string = '';

  creating: boolean = false;
  loading: boolean = false;

  selected_polygon: any = {};

  @ViewChild('AGM') agm: any;

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute
  ) {}

  new_polygon() {
    this.creating = true;
    this.agm._mapsWrapper.createPolygon({
      paths: this.paths,
      draggable: true,
      geodesic: true,
      editable: true
    }).then((polygon: any) => {
      this.polygon = polygon;
    });
  }

  cancel_polygon() {
    this.creating = false;
    this.name = '';
    this.polygon.setMap(null);
  }

  delete_polygon(area) {
    this.areaService.area_delete(area._id).subscribe(
      poly => {
        this.polygons = this.polygons.filter(p => p._id !== poly._id);
      }
    );
  }


  save_polygon() {
    let paths = [];
    this.polygon.getPath().b.map(obj => console.log);
    for (let i = 0; i < this.polygon.getPath().getLength(); i++) {
      const point = {
        lat: this.polygon.getPath().getAt(i).lat(),
        lng: this.polygon.getPath().getAt(i).lng(),
      };
      paths.push(point);
    }

    const polygon = {
      name: this.name,
      paths: paths
    };

    this.areaService.area_create(this.group_id, polygon).subscribe(
      area => {
        this.polygons.push(area);
        this.polygon.setMap(null);
        this.name = '';
        this.creating = false;
      }
    )
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.group_id = params['id'];
    })

    this.areaService.area_list().subscribe(
      areas => this.polygons = areas
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  areas_show() {
    return this.polygons.filter(p => p.group === this.group_id);
  }

  select_polygon(p) {
    this.selected_polygon = p;
  }

}
