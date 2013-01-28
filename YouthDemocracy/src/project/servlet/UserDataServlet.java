package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.UserData;

import com.google.appengine.api.datastore.Entity;

@SuppressWarnings("serial")
public class UserDataServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(UserDataServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__UserDataServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining UserData listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    int offset=Integer.parseInt(req.getParameter("offset"));
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	      Iterable<Entity> entities = UserData.getAllUserDatas(offset);
	      out.println(Util.writeJSON(entities));
	    } 
	    else{
	    	 Iterable<Entity> entities = UserData.getUserData(searchBy,searchFor,offset);
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__UserDataServlet doPut__");
	    logger.log(Level.INFO, "Creating UserData");
	    
	    String Entity_Type=req.getParameter("Entity_Type");
	    String User_ID=req.getParameter("User_ID");
	    String Entity_Name=req.getParameter("Entity_Name");
	    
	    int traitCount=7;
	    String[] TraitName = new String[traitCount];
	    int[] TraitValue = new int[traitCount];
	    TraitName[0]="Education";TraitValue[0]=Integer.parseInt(req.getParameter(TraitName[0]));
	    TraitName[1]="Military";TraitValue[1]=Integer.parseInt(req.getParameter(TraitName[1]));
	    TraitName[2]="Economy";TraitValue[2]=Integer.parseInt(req.getParameter(TraitName[2]));
	    TraitName[3]="Industry";TraitValue[3]=Integer.parseInt(req.getParameter(TraitName[3]));
	    TraitName[4]="Religion";TraitValue[4]=Integer.parseInt(req.getParameter(TraitName[4]));
	    TraitName[5]="Health";TraitValue[5]=Integer.parseInt(req.getParameter(TraitName[5]));
	    TraitName[6]="Environment";TraitValue[6]=Integer.parseInt(req.getParameter(TraitName[6]));
	    UserData.create(Entity_Type,User_ID,Entity_Name,TraitName,TraitValue);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the userData and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		 // System.out.println("__UserDataServlet doDelete__");
		logger.log(Level.INFO, "deleting userData");
	    String userDataKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(UserData.delete(userDataKey));
	    } catch(Exception e) {
	      out.println(Util.getErrorMessage(e));
	    }      
	  }

	  /**
	   * Redirects to delete or insert entity based on the action in the HTTP
	   * request.
	   */
	  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__UserDataServlet doPost__");
	    String action = req.getParameter("action");
	    if (action.equalsIgnoreCase("delete")) {
	      doDelete(req, resp);
	      return;
	    } else if (action.equalsIgnoreCase("put")) {
	      doPut(req, resp);
	      return;
	    }
	  }
}
