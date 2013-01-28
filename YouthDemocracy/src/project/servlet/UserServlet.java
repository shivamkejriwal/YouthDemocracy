package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.User;

import com.google.appengine.api.datastore.Entity;

@SuppressWarnings("serial")
public class UserServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(UserServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__UserServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining User listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    int offset=Integer.parseInt(req.getParameter("offset"));
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	      Iterable<Entity> entities = User.getAllUsers(offset);
	      out.println(Util.writeJSON(entities));
	    } 
	    else{
	    	 Iterable<Entity> entities = User.getUser(searchBy,searchFor,offset);
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__UserServlet doPut__");
	    logger.log(Level.INFO, "Creating User");
	    
	    String[] Name = new String[6];
	    String[] Value = new String[6];
	    Name[0]="id";Value[0]=req.getParameter(Name[0]);
	    Name[1]="First_Name";Value[1]=req.getParameter(Name[1]);
	    Name[2]="Last_Name";Value[2]=req.getParameter(Name[2]);
	    Name[3]="Email";Value[3]=req.getParameter(Name[3]);
	    Name[4]="Gender";Value[4]=req.getParameter(Name[4]);
	    Name[5]="Hometown";Value[5]=req.getParameter(Name[5]);
	    
	    User.create(Name,Value);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the user and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		 // System.out.println("__UserServlet doDelete__");
		logger.log(Level.INFO, "deleting User");
	    String userKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(User.delete(userKey));
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
		//System.out.println("__UserServlet doPost__");
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
