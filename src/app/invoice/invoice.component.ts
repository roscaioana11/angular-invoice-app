import { Component, OnInit } from '@angular/core';
import {Invoice} from "./invoice";
import {HttpClient} from "@angular/common/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  closeResult = '';
  invoiceList: Invoice[] = []; //declara lista care v-a popula tabelul
  myForm = this.formBuilder.group({
    description: '',
    amount: '',
    sender: '',
    receiver: ''
  })

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.httpClient.get<Invoice[]>('http://localhost:8081/invoices').subscribe(response => {
      console.log(response);
      this.invoiceList = response;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save(){
    const invoice: Invoice = {amount: this.myForm.value.amount, description: this.myForm.value.description,
      receiver: this.myForm.value.receiver, sender: this.myForm.value.sender}
    this.httpClient.post('http://localhost:8081/invoices', invoice).subscribe(response => {
      this.invoiceList.push(<Invoice>response)
    })
  }

  delete(id?: string){
    this.httpClient.delete('http://localhost:8081/invoices/' + id).subscribe(response => {
      this.invoiceList = this.invoiceList.filter(element => element.id != id)
    })
  }

}
