import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, flatMap } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface Physician {
  name: string;
  specialization: string;
  qualification: string;
  age: number,
  gender: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  healthRecord:any;
  prescriptionForm: FormGroup;
  physicianForm: FormGroup;
  prescriptionRecords: any[] = [];
  flag:boolean=true;
  selectedPhysician: Physician | null = null;
  @ViewChild("chart", { static: false }) 
  private chartDom?: ElementRef;
  btn=document.getElementById('chart');
  chart?: am4charts.PieChart;
   physicians: Physician[] = [
    { name: 'Dr. Mona Doe', specialization: 'General Medicine',qualification: 'MBBS',age: 26,gender:'male' },
    { name: 'Dr. Jane Singh', specialization: 'Pediatrics',qualification: 'PG',age: 27,gender:'male' },
    { name: 'Dr. Swarnim Dubey', specialization: 'General physician',qualification:'PHD',age: 28,gender:'male' },
    { name: 'Dr. Sam Smith', specialization: 'Cardiologist',qualification:'MPT',age: 29,gender:'male' },
    { name: 'Dr. Ram Sharma', specialization: 'Physiotherapist',qualification:'BPT',age: 30,gender:'male' },
    { name: 'Dr. Siddhant Gupta', specialization: 'Radiologist',qualification:'BMS',age: 31,gender:'male' },
    { name: 'Dr. Sanket Dixit', specialization: 'Heart Specialist',qualification:'MPHARMA',age: 32,gender:'male' },
    { name: 'Dr. Yash Jain', specialization: 'Lungs Specialist',qualification:'BPHARMA',age: 33,gender:'male' },
  ];

  private selectedPhysicianSubject = new BehaviorSubject<Physician | null>(null);
  selectedPhysician$ = this.selectedPhysicianSubject.asObservable();
  constructor(private fb: FormBuilder,) {
    this.prescriptionForm = this.fb.group({
      patientName: ['', Validators.required],
      physicianName: ['', Validators.required],
      age: [null, Validators.required],
      selectedTests: [[], Validators.required],
      gender:['']
    });
    this.physicians = this.getPhysicians();
    this.physicianForm = this.fb.group({
      qualification: [''],
      name: [''],
      specialization: [''],
      age: [null],
      gender:['']
    });
  }
  getPhysicians(): Physician[] {
    return this.physicians;
  }

  setSelectedPhysician(physician: Physician): void {
    this.selectedPhysicianSubject.next(physician);
  }

  //for updating data
  updatePhysician(updatedPhysician: Physician): void {
    const index = this.physicians.findIndex(p => p.name === updatedPhysician.name);
    if (index !== -1) {
      this.physicians[index] = { ...this.physicians[index], ...updatedPhysician };
    }
  }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let chart = am4core.create(this.chartDom?.nativeElement, am4charts.PieChart);
    // Add data
    chart.data = [ {
      "country": "CBC",
      "litres": 33.33
    }, {
      "country": "Chemistry",
      "litres": 33.33
    }, {
      "country": "RTC",
      "litres": 33.33
    }];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart;
  }
  //for adding record
  addRecord() {
    const record = this.prescriptionForm.value;
    if(this.prescriptionForm.controls['patientName'].value && this.prescriptionForm.controls['physicianName'].value 
    && this.prescriptionForm.controls['age'].value && this.prescriptionForm.controls['selectedTests'].value){
    this.prescriptionRecords.push(record);
  }

    // Reset form values
    this.resetForm();
  }

  

  resetForm() {
    this.prescriptionForm.reset({
      patientName: '',
      physicianName: '',
      age: null,
      selectedTests: [],
    });
  }
  selectedTab: string = 'consultation';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onSelectPhysician(physician: Physician): void {
    this.selectedPhysician = physician;
    this.physicianForm.patchValue(physician);
  }

  onUpdatePhysician(): void {
    if (this.selectedPhysician) {
      const updatedPhysician: Physician = this.physicianForm.value;
      const index = this.physicians.findIndex(p => p.name === this.selectedPhysician?.name);
      if (index !== -1) {
        this.physicians[index] = { ...this.physicians[index], ...updatedPhysician };
        this.selectedPhysician = null;
        this.physicianForm.reset();
      }
    }
  }

  onResetForm(): void {
    this.selectedPhysician = null;
    this.physicianForm.reset();
  }
}