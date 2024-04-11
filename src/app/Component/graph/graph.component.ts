import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  chart1: any;
  chart2: any;

  constructor() { }

  ngOnInit() {
    this.chart1 = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août' , 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [{
          label: 'Nombres de projets réalisés par mois',
          data: [1,2,4,3,2,4,3,4,1,2,3,1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

        this.chart2 = new Chart('canvas2', {
      type: 'pie',
      data: {
        labels: ['Enregistré', 'En cours', 'Terminé', ' Annulé'],
        datasets: [{
          label: 'Status des projets',
          data: [30,17,9,4],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(170, 255,132, 0.2)',
            'rgba(255, 0, 22, 0.2)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(170,255, 132, 1)',
            'rgba(255, 0, 22, 01)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
