import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { company_id, searchQuery, location }) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

// Saved job
export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job: jobs(*, company: companies(name,logo_url))");
  
    if (error) {
      console.error("Error fetching Saved Jobs:", error);
      return null;
    }
  
    return data;
  }

  export async function getSingleJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
    let query = supabase
      .from("jobs")
      .select(
        "*, company: companies(name,logo_url), applications: applications(*)"
      )
      .eq("id", job_id)
      .single();
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error fetching Job:", error);
      return null;
    }
  
    return data;
  }

  export async function updateHiringStatus(token, { job_id }, isOpen) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("jobs")
      .update({ isOpen })
      .eq("id", job_id)
      .select();
  
    if (error) {
      console.error("Error Updating Hiring Status:", error);
      return null;
    }
  
    return data;
  }