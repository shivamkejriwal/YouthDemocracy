package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class UserData {

	/*
	 * String Name
	 * String User_ID
	 * String Entity_ID
	 * Entity
	 * int Financial;
	 * int Aggressive;
	 * int Charasmatic;
	 * int Creative;
	 * int Industrious;
	 * int Organized;
	 * int Philosophical;
	 */
	
	public static void create(String Entity_Type,String User_ID,String Entity_Name,String[]TraitName,int[]TraitValue)
	{
		//System.out.println("__UserData Create__");
		Entity userData = get(User_ID+"_"+Entity_Name);
		if(userData==null)
		{
			userData = new Entity("UserData", User_ID+"_"+Entity_Name);
			userData.setProperty("Entity_Type", Entity_Type);
			userData.setProperty("Entity_Name", Entity_Name);
			userData.setProperty("User_ID", User_ID);
			
			for(int i=0;i<TraitValue.length;i++){
				if(TraitValue[i]<0)TraitValue[i]=0;
				if(TraitValue[i]>10)TraitValue[i]=10;
				userData.setProperty(TraitName[i], TraitValue[i]);
			}
			
		}
		else
		{
			userData=update(userData,Entity_Type,User_ID,Entity_Name,TraitName,TraitValue);
		}
		Util.persistEntity(userData);
	}
	private static Entity update(Entity userData,String Entity_Type,String User_ID,String Entity_Name,String[]TraitName,int[]TraitValue)
	{
		if (Entity_Type != null && !Entity_Type.equals("")) {
			userData.setProperty("Entity_Type", Entity_Type);
	      }
		if (User_ID != null && !User_ID.equals("")) {
			userData.setProperty("User_ID", User_ID);
	      }
		if (Entity_Name != null && !Entity_Name.equals("")) {
			userData.setProperty("Entity_Name", Entity_Name);
	      }
		for(int i=0;i<TraitValue.length;i++){
			if (TraitValue[i]>=0 && TraitValue[i]<=10) {
				userData.setProperty(TraitName[i], TraitValue[i]);
		      }
			else if(TraitValue[i]<0){TraitValue[i]=0; userData.setProperty(TraitName[i], TraitValue[i]); }
			else if(TraitValue[i]>10){TraitValue[i]=10; userData.setProperty(TraitName[i], TraitValue[i]); }
		}
		return userData;
	}
	
	public static String delete(String userDataKey)
	{
	    Entity entity = get(userDataKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("UserData deleted successfully.");
	    } else
	      return("UserData not found");      
	  }
	public static Entity get(String UserDataName) 
	{
		Key key = KeyFactory.createKey("UserData", UserDataName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllUserDatas() {
		Iterable<Entity> entities = Util.listEntities("UserData", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getUserData(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="user_id";
		Iterable<Entity> entities = Util.listEntities("UserData", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllUserDatas(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("UserData", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getUserData(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="user_id";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("UserData", searchBy, searchFor);
	  	return entities;
	}
}
