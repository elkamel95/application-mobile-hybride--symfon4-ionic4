import {Patient} from './patient';

export class Utilisateur
	{
    id ?:number;//id isn't required ...
    public nom ?: string;
    public prenom ?: string;

    public sexe ?: string;
public role:number;
public age ?:number;
public etat ?:string;
public tel ?:string;
public motpasse ?:string;

public email ?:string;
} 