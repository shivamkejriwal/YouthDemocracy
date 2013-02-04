package project.servlet;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.Leader;
import project.model.Party;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;

@SuppressWarnings("serial")
public class AssimilateData extends BaseServlet {

	private static final Logger logger = Logger.getLogger(AssimilateData.class.getCanonicalName());	
	
	/**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__AssimilateData doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining Leader listing");
	    doLeader();
	    doParty();
	  }
	 protected void doLeader(){
		 //System.out.println("__doLeader doGet__");
		 DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

		//get  all leaders
	    	Iterable<Entity> leaders = Leader.getAllLeaders();
	    //for each leader get entire user Data
	    	for (Entity currLeader : leaders) {
	    		//System.out.println("CurrLeader:"+currLeader.getProperty("Name"));
	    		Query query = new Query("UserData");
	    		query.addFilter("Entity_Type", FilterOperator.EQUAL, "leader");
	    		query.addFilter("Entity_Name", FilterOperator.EQUAL, currLeader.getProperty("Name"));
	    		Iterable<Entity> leaderData = ds.prepare(query).asIterable();
	    		int Education=0,Military=0,Economy=0,Industry=0,Religion=0,Health=0,Environment=0;
	    		int count=0;
	    		for (Entity currData : leaderData) {
	    		/*	System.out.println("for User:"+currData.getProperty("User_ID")
	    					+",Entity_Name:"+currData.getProperty("Entity_Name")
	    					+",Education:"+currData.getProperty("Education"));*/
	    			Education+=Integer.parseInt( currData.getProperty("Education").toString());
	    			Military+=Integer.parseInt( currData.getProperty("Military").toString());
	    			Economy+=Integer.parseInt( currData.getProperty("Economy").toString());
	    			Industry+=Integer.parseInt( currData.getProperty("Industry").toString());
	    			Religion+=Integer.parseInt( currData.getProperty("Religion").toString());
	    			Health+=Integer.parseInt( currData.getProperty("Health").toString());
	    			Environment+=Integer.parseInt( currData.getProperty("Environment").toString());
	    			
	    			count++;
	    		}
	    		//average it
	    		if(count>0)
	    		{
	    			//System.out.println("CurrLeader:"+currLeader.getProperty("Name")+",Trait Total:"+trait+",Trait Count:"+count);
		    		currLeader.setProperty("Education", Education/count);
		    		currLeader.setProperty("Military", Military/count);
		    		currLeader.setProperty("Economy", Economy/count);
		    		currLeader.setProperty("Industry", Industry/count);
		    		currLeader.setProperty("Religion", Religion/count);
		    		currLeader.setProperty("Health", Health/count);
		    		currLeader.setProperty("Environment", Environment/count);
		    		//put it back into respective leader
		    		//System.out.println("Current Leader:"+currLeader.toString());
		    		Util.persistEntity(currLeader);
		    	}
	    	}
	    
	 }

	 protected void doParty(){
		 //System.out.println("__doParty doGet__");
		 DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

		//get  all leaders
	    	Iterable<Entity> parties = Party.getAllPartys();
	    //for each leader get entire user Data
	    	for (Entity currParty : parties) {
	    		//System.out.println("CurrLeader:"+currLeader.getProperty("Name"));
	    		Query query = new Query("UserData");
	    		query.addFilter("Entity_Type", FilterOperator.EQUAL, "party");
	    		query.addFilter("Entity_Name", FilterOperator.EQUAL, currParty.getProperty("Name"));
	    		Iterable<Entity> leaderData = ds.prepare(query).asIterable();
	    		int Education=0,Military=0,Economy=0,Industry=0,Religion=0,Health=0,Environment=0;
	    		int count=0;
	    		for (Entity currData : leaderData) {
	    		/*	System.out.println("for User:"+currData.getProperty("User_ID")
	    					+",Entity_Name:"+currData.getProperty("Entity_Name")
	    					+",Education:"+currData.getProperty("Education"));*/
	    			Education+=Integer.parseInt( currData.getProperty("Education").toString());
	    			Military+=Integer.parseInt( currData.getProperty("Military").toString());
	    			Economy+=Integer.parseInt( currData.getProperty("Economy").toString());
	    			Industry+=Integer.parseInt( currData.getProperty("Industry").toString());
	    			Religion+=Integer.parseInt( currData.getProperty("Religion").toString());
	    			Health+=Integer.parseInt( currData.getProperty("Health").toString());
	    			Environment+=Integer.parseInt( currData.getProperty("Environment").toString());
	    			
	    			count++;
	    		}
	    		//average it
	    		if(count>0)
	    		{
	    			//System.out.println("currParty:"+currParty.getProperty("Name")+",Trait Total:"+trait+",Trait Count:"+count);
	    			currParty.setProperty("Education", Education/count);
	    			currParty.setProperty("Military", Military/count);
	    			currParty.setProperty("Economy", Economy/count);
	    			currParty.setProperty("Industry", Industry/count);
	    			currParty.setProperty("Religion", Religion/count);
	    			currParty.setProperty("Health", Health/count);
	    			currParty.setProperty("Environment", Environment/count);
		    		//put it back into respective party
		    		//System.out.println("Current Party:"+currParty.toString());
		    		Util.persistEntity(currParty);
		    	}
	    	}
	    
	 }
	 
	
}
