const STORAGE_KEY = 'work_drafts';

export function getAllDrafts() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Failed to parse drafts from localStorage:', error);
    return [];
  }
}

export function saveDraft(challengeId, workId, title, content) {
  if (typeof window === 'undefined') return null;
  
  try {
    const drafts = getAllDrafts();
    const draftData = {
      draftId: `${challengeId}_${workId}_${Date.now()}`,
      challengeId,
      workId,
      title,
      content,
      savedAt: new Date().toISOString(),
    };
    
    drafts.push(draftData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return draftData;
  } catch (error) {
    console.error('Failed to save draft:', error);
    return null;
  }
}

export function getDraftsForWork(challengeId, workId) {
  const drafts = getAllDrafts();
  return drafts.filter((d) => d.challengeId === challengeId && d.workId === workId);
}

export function getSortedDraftsForWork(challengeId, workId) {
  const drafts = getDraftsForWork(challengeId, workId);
  return drafts.sort((a, b) => {
    return new Date(b.savedAt) - new Date(a.savedAt);
  });
}

export function hasDraftsForWork(challengeId, workId) {
  return getDraftsForWork(challengeId, workId).length > 0;
}

export function deleteDraft(draftId) {
  if (typeof window === 'undefined') return false;
  
  try {
    const drafts = getAllDrafts();
    const filtered = drafts.filter((d) => d.draftId !== draftId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete draft:', error);
    return false;
  }
}

