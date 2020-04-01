export class LoanModel {
  constructor(public id: number,
              public title: string,
              public member: string,
              public borrowdate: string,
              public returndate: string) {
  }
}
