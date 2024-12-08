export interface Employee {
    _id: string;
  code: number;
  name: string;
  lastname1: string;
  lastname2: string;
  departamentCode: {
    _id:string;
    code:number;
  };
}

export interface iEmployee {
code: number;
name: string;
lastname1: string;
lastname2: string;
departamentCode: string;
}
