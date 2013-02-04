package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;

import project.Util;

public class Leader {

	/*
	 * String Name
	 * String Party
	 * String Description
	 * int Financial;
	 * int Aggressive;
	 * int Charasmatic;
	 * int Creative;
	 * int Industrious;
	 * int Organized;
	 * int Philosophical;
	 */
	
	public static void create(String Name,String Party,int Page_Rank,String Image_URL
			,String[]TraitName,int[]TraitValue
			,Text Desciption,Text Professed_Manifesto, Text Actual_Manifesto) 
	{
		//System.out.println("__Leader Create__");
		//System.out.println("LeaderModel Desciption:"+Desciption+",Page_Rank:"+Page_Rank);
		Entity leader = get(Name);
		if(leader==null)
		{
			leader = new Entity("Leader", Name);
			leader.setProperty("Name", Name);
			leader.setProperty("Party", Party);
			leader.setProperty("Page_Rank", Page_Rank);
			leader.setUnindexedProperty("Image_URL", Image_URL);
			for(int i=0;i<TraitValue.length;i++){
				if(TraitValue[i]<0)TraitValue[i]=0;
				if(TraitValue[i]>10)TraitValue[i]=10;
				leader.setProperty(TraitName[i], TraitValue[i]);
			}
			
			leader.setProperty("Desciption", Desciption);
			leader.setProperty("Professed_Manifesto", Professed_Manifesto);
			leader.setProperty("Actual_Manifesto", Actual_Manifesto);
		}
		else
		{
			leader=update(leader,Name,Party,Page_Rank,Image_URL
		    		,TraitName,TraitValue
		    		,Desciption,Professed_Manifesto,Actual_Manifesto);
		}
		//System.out.println("Saving Leader:"+leader);
		Util.persistEntity(leader);
	}
	private static Entity update(Entity leader, String Name,String Party,int Page_Rank,String Image_URL
			,String[]TraitName,int[]TraitValue
			,Text Desciption,Text Professed_Manifesto, Text Actual_Manifesto) 
	{
		leader.setProperty("Page_Rank", Page_Rank);//No Conditions
		if (Name != null && !Name.equals("")) {
	        leader.setProperty("Name", Name);
	      }
		if (Party != null && !Party.equals("")) {
	        leader.setProperty("Party", Party);
	      }
		if (Image_URL != null && !Image_URL.equals("")) {
	        leader.setUnindexedProperty("Image_URL", Image_URL);
	      }
		for(int i=0;i<TraitValue.length;i++){
			if (TraitValue[i]>=0 && TraitValue[i]<=10) {
		        leader.setProperty(TraitName[i], TraitValue[i]);
		      }
			else if(TraitValue[i]<0){TraitValue[i]=0; leader.setProperty(TraitName[i], TraitValue[i]); }
			else if(TraitValue[i]>10){TraitValue[i]=10; leader.setProperty(TraitName[i], TraitValue[i]); }
		}
		if (Desciption != null && !Desciption.equals("")) {
	        leader.setProperty("Desciption", Desciption);
	      }
		if (Professed_Manifesto != null && !Professed_Manifesto.equals("")) {
	        leader.setProperty("Professed_Manifesto", Professed_Manifesto);
	      }
		if (Actual_Manifesto != null && !Actual_Manifesto.equals("")) {
	        leader.setProperty("Actual_Manifesto", Actual_Manifesto);
	      }
		return leader;
	}
	public static String delete(String leaderKey)
	{
	    Entity entity = get(leaderKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("Leader deleted successfully.");
	    } else
	      return("Leader not found");      
	  }
	public static Entity get(String LeaderName) 
	{
		Key key = KeyFactory.createKey("Leader", LeaderName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllLeaders() {
		Iterable<Entity> entities = Util.listEntities("Leader", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getAllLeaders(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Leader", null, null,offset);
	  	return entities;
	}
	public static Iterable<Entity> getLeader(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Name";
		Iterable<Entity> entities = Util.listEntities("Leader", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getLeader(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Name";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Leader", searchBy, searchFor,offset);
	  	return entities;
	}
}
