import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder:FormBuilder) { }

  createAnnounceForm():FormGroup{
    return this.formBuilder.group({
      title:["",[Validators.required,Validators.minLength(2),Validators.maxLength(200)]],
      content:["",[Validators.required,Validators.minLength(3)]],
      status:[ "",[Validators.required]]
    });
  }

  createCongressForm():FormGroup{
    return this.formBuilder.group({
      congressPresidentId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      congressName:["",[Validators.required,Validators.minLength(3)]],
      congressAbout:["",[Validators.required,Validators.minLength(50)]],
      congressCity:["",[Validators.required,Validators.minLength(3)]],
      congressPlace:["",[Validators.required,Validators.minLength(3)]],
      congressStatus:["",[Validators.required]]
    });
  }

  createCongressPresidentForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      presidentName:["",[Validators.required,Validators.minLength(2)]]
    });
  }

  createRegulatoryBoardForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      memberName:["",[Validators.required,Validators.minLength(2)]],
      univercity:["",[Validators.required,Validators.minLength(5)]]
    });
  }

  createScienceBoardForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      memberName:["",[Validators.required,Validators.minLength(2)]],
      univercity:["",[Validators.required,Validators.minLength(5)]]
    });
  }

  createTopicForm():FormGroup{
    return this.formBuilder.group({
      congressId:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      topicName:["",[Validators.required,Validators.minLength(2)]],
      category:["",[Validators.required,Validators.minLength(5)]]
    });
  }

  createTransportLayoverForm():FormGroup{
    return this.formBuilder.group({
      capacity:["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      minDemand:["",[Validators.required,Validators.minLength(2)]],
      description:["",[Validators.required,Validators.minLength(5)]]
    });
  }
}
