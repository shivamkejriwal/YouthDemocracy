package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;

@SuppressWarnings("serial")
public class FindNearestNeighbor extends BaseServlet {

	private static final Logger logger = Logger.getLogger(FindNearestNeighbor.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__FindNearestNeighbor doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining Data listing");
	    String searchBy = req.getParameter("searchBy");
	    if(searchBy.equals("Leader")){
		    PrintWriter out = resp.getWriter();
			out.println( getLeader(req,resp) );
	    }
	    else if(searchBy.equals("Party")){
	    	PrintWriter out = resp.getWriter();
			out.println( getParty(req,resp) );
	    }
	  }
	  protected String getLeader(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		 // System.out.println("__getLeader doGet__");
		  
		  int traitCount=7;
		  String[] TraitName = new String[traitCount];
		    TraitName[0]="Education";
		    TraitName[1]="Military";
		    TraitName[2]="Economy";
		    TraitName[3]="Industry";
		    TraitName[4]="Religion";
		    TraitName[5]="Health";
		    TraitName[6]="Environment";
		  
		  int[] requiredTrait = new int[traitCount];
		  int[] bestTrait = new int[traitCount];
		  int bestDist=0;
		  
		  DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		  Query query = new Query("Leader");
		  Iterator<Entity> leaders = ds.prepare(query).asIterator();
		  
		  Entity bestLeader=leaders.next();

		  for(int i=0;i<traitCount;i++){
			  requiredTrait[i] = Integer.parseInt(req.getParameter(TraitName[i]));
			  bestTrait[i] =Integer.parseInt(bestLeader.getProperty(TraitName[i]).toString());
			  bestDist+=(int) Math.pow(bestTrait[i]-requiredTrait[i],2);
		  }
		  
		  
		  //System.out.println("requiredTrait:"+requiredTrait+",bestDist:"+bestDist+",bestTrait:"+bestTrait);
		  
		  while (leaders.hasNext()) 
		  {
			  Entity currLeader=leaders.next();
			  int[] currTrait = new int[traitCount];
			  int currDist=0;
			  for(int i=0;i<traitCount;i++){
				  currTrait[i] =Integer.parseInt(currLeader.getProperty(TraitName[i]).toString());
				  currDist+=(int) Math.pow(currTrait[i]-requiredTrait[i],2);
			  }
			  
			 // System.out.println("bestDist:"+bestDist+",currDist:"+currDist);
			  
			  if(currDist<bestDist)
			  {
				  bestDist=currDist;
				  bestLeader=currLeader;
			  }
		    }
		  //System.out.println("Best Match is "+bestLeader.getProperty("Name"));
		  return Util.writeJSON(bestLeader);
	  }
	  
	  protected String getParty(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		 // System.out.println("__getParty doGet__");
		  int traitCount=7;
		  String[] TraitName = new String[traitCount];
		    TraitName[0]="Education";
		    TraitName[1]="Military";
		    TraitName[2]="Economy";
		    TraitName[3]="Industry";
		    TraitName[4]="Religion";
		    TraitName[5]="Health";
		    TraitName[6]="Environment";
		  
		  int[] requiredTrait = new int[traitCount];
		  int[] bestTrait = new int[traitCount];
		  int bestDist=0;
		  
		  DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		  Query query = new Query("Party");
		  Iterator<Entity> parties = ds.prepare(query).asIterator();
		  
		  Entity bestParty=parties.next();

		  for(int i=0;i<traitCount;i++){
			  requiredTrait[i] = Integer.parseInt(req.getParameter(TraitName[i]));
			  bestTrait[i] =Integer.parseInt(bestParty.getProperty(TraitName[i]).toString());
			  bestDist+=(int) Math.pow(bestTrait[i]-requiredTrait[i],2);
		  }
		  
		  
		  //System.out.println("requiredTrait:"+requiredTrait+",bestDist:"+bestDist+",bestTrait:"+bestTrait);
		  
		  while (parties.hasNext()) 
		  {
			  Entity currParty=parties.next();
			  int[] currTrait = new int[traitCount];
			  int currDist=0;
			  for(int i=0;i<traitCount;i++){
				  currTrait[i] =Integer.parseInt(currParty.getProperty(TraitName[i]).toString());
				  currDist+=(int) Math.pow(currTrait[i]-requiredTrait[i],2);
			  }
			  
			 // System.out.println("bestDist:"+bestDist+",currDist:"+currDist);
			  
			  if(currDist<bestDist)
			  {
				  bestDist=currDist;
				  bestParty=currParty;
			  }
		    }
		 // System.out.println("Best Match is "+bestParty.getProperty("Name"));
		  return Util.writeJSON(bestParty);
		}
	  
}
