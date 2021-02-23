import {Entity} from './entity.js';

// !! Vraag: als ik nu entityManager.entities[0].name wil veranderen. Moet ik dan de hele manager clonen en al zijn entities?

export class EntityManager {
    constructor() {
        this.entities = [];
        this.entityManagerSetter = undefined;
        this.targetEntityId = undefined; 

        /* Methods for cloning */
        /* this.funcCreateEntity = this.CreateEntity;
        this.funcUpdateState = this.UpdateState;
        this.funcSetSetter = this.SetSetter;
        this.funcGetTargetEntity = this.GetTargetEntity; */
    }

    GetTargetEntity() {
        const targetEntity = this.targetEntityId === undefined ? undefined : this.entities[this.targetEntityId];
        return targetEntity;
    }

    SetTargetEntity(newTargetEntity) {
        const id = this.entities.findIndex(entity => entity.id === newTargetEntity.id);
        this.targetEntityId = id;
        this.UpdateState();
    }

    SetSetter(setter) {
        this.entityManagerSetter = setter;
    }

    CreateEntity(entityProperties) {
        const newEntity = new Entity(this.entities.length);
        Object.keys(entityProperties).forEach(e => newEntity[e] = entityProperties[e])
        this.entities.push(newEntity);
        this.SetTargetEntity(newEntity);
    }

    UpdateState() {

        const clonedEntities = this.entities.map(entity => {return {...entity}});

        const clonedManager =  Object.assign(
            Object.create(
              // Set the prototype of the new object to the prototype of the instance.
              // Used to allow new object behave like class instance.
              Object.getPrototypeOf(this),
            ),
            // Prevent shallow copies of nested structures like arrays, etc
            JSON.parse(JSON.stringify(this)),
          );


        //const clonedManager = {...this};
        clonedManager.entities = clonedEntities;
        this.entityManagerSetter(clonedManager);
    }

}