package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;

import project.Util;

public class Party {

	/*
	 * String Name
	 * String Description
	 * int Financial;
	 * int Aggressive;
	 * int Charasmatic;
	 * int Creative;
	 * int Industrious;
	 * int Organized;
	 * int Philosophical;
	 */
	
	public static void create(String Name,int Page_Rank,String Image_URL
			,String[]TraitName,int[]TraitValue
			,Text Desciption,Text Professed_Manifesto, Text Actual_Manifesto) 
	{
		//System.out.println("__Party Create__");
		Entity party = get(Name);
		if(party==null)
		{
			party = new Entity("Party", Name);
			party.setProperty("Name", Name);
			party.setProperty("Page_Rank", Page_Rank);
			party.setUnindexedProperty("Image_URL", Image_URL);
			for(int i=0;i<TraitValue.length;i++){
				if(TraitValue[i]<0)TraitValue[i]=0;
				if(TraitValue[i]>10)TraitValue[i]=10;
				party.setProperty(TraitName[i], TraitValue[i]);
			}
			party.setProperty("Desciption", Desciption);
			party.setProperty("Professed_Manifesto", Professed_Manifesto);
			party.setProperty("Actual_Manifesto", Actual_Manifesto);
		}
		else
		{
			party=update(party,Name,Page_Rank,Image_URL
		    		,TraitName,TraitValue
		    		,Desciption,Professed_Manifesto,Actual_Manifesto);
		}
		//System.out.println("Saving Party:"+party);
		Util.persistEntity(party);
		
	}
	private static Entity update(Entity party, String Name,int Page_Rank,String Image_URL
			,String[]TraitName,int[]TraitValue
			,Text Desciption,Text Professed_Manifesto, Text Actual_Manifesto)
	{
		party.setProperty("Page_Rank", Page_Rank);//No Conditions
		
		if (Name != null && !Name.equals("")) {
	        party.setProperty("Name", Name);
	      }
		if (Image_URL != null && !Image_URL.equals("")) {
	        party.setUnindexedProperty("Image_URL", Image_URL);
	      }
		for(int i=0;i<TraitValue.length;i++){
			if (TraitValue[i]>=0 && TraitValue[i]<=10) {
				party.setProperty(TraitName[i], TraitValue[i]);
		      }
			else if(TraitValue[i]<0){TraitValue[i]=0; party.setProperty(TraitName[i], TraitValue[i]); }
			else if(TraitValue[i]>10){TraitValue[i]=10; party.setProperty(TraitName[i], TraitValue[i]); }
		}
		if (Desciption != null && !Desciption.equals("")) {
	        party.setProperty("Desciption", Desciption);
	      }
		if (Professed_Manifesto != null && !Professed_Manifesto.equals("")) {
	        party.setProperty("Professed_Manifesto", Professed_Manifesto);
	      }
		if (Actual_Manifesto != null && !Actual_Manifesto.equals("")) {
	        party.setProperty("Actual_Manifesto", Actual_Manifesto);
	      }
		return party;
	}
	public static String delete(String partyKey)
	{
	    Entity entity = get(partyKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("Party deleted successfully.");
	    } else
	      return("Party not found");      
	  }
	public static Entity get(String PartyName) 
	{
		Key key = KeyFactory.createKey("Party", PartyName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllPartys() {
		Iterable<Entity> entities = Util.listEntities("Party", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getParty(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Name";
		Iterable<Entity> entities = Util.listEntities("Party", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllPartys(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Party", null, null,offset);
	  	return entities;
	}
	public static Iterable<Entity> getParty(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Name";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Party", searchBy, searchFor,offset);
	  	return entities;
	}
}
