import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  datetime= new Date();
  status:boolean;
  constructor(private formBuilder:FormBuilder) { }
  
  createAnnounceForm():FormGroup{
    return this.formBuilder.group({
      announceTitle:["",[Validators.required,Validators.minLength(2),Validators.maxLength(200)]],
      announceContent:["",[Validators.required,Validators.minLength(3)]],
       announceStatus:["",[Validators.required]],
       announceDate:new FormControl(this.datetime.toISOString().substring(0, 16)),
    });
  }

  createCongressForm():FormGroup{
    return this.formBuilder.group({
      congressPresidentId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      congressName:["",[Validators.required,Validators.minLength(3)]],
      congressAbout:["",[Validators.required,Validators.minLength(50)]],
      congressCity:["",[Validators.required,Validators.minLength(3)]],
      congressPlace:["",[Validators.required,Validators.minLength(3)]],
      congressStatus:["",[Validators.required]],
      congressDate:new FormControl(this.datetime.toISOString().substring(0, 16)),
      regulatoryBoardId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      scienceBoardId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      topicId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
    });
  } 

  createCongressPresidentForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      congressPresidentName:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
    })
  }

  createRegulatoryBoardForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      regulatoryBoardMemberName:["",[Validators.required,Validators.minLength(2)]],
      univercity:["",[Validators.required,Validators.minLength(5)]]
    });
  }

  createScienceBoardForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      scienceBoardMemberName:["",[Validators.required,Validators.minLength(2)]],
      univercity:["",[Validators.required,Validators.minLength(5)]]
    });
  }

  createTopicForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      topicName:["",[Validators.required,Validators.minLength(2)]],
      category:["",[Validators.required,Validators.minLength(2)]]
    });
  }

  createTransportLayoverForm():FormGroup{
    return this.formBuilder.group({
      capacity:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      minDemand:["",[Validators.required,Validators.minLength(2)]],
      description:["",[Validators.required,Validators.minLength(5)]],
      Price: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
    });
  }
}
