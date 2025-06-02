import { RequestHandler } from 'express';
import { TextModel } from '../models/textModel';
import { analyzeText } from '../services/textAnalysisService';

// Define types for params and bodies
interface TextParams {
  id: string;
}

interface TextBody {
  content: string;
}

// Create
export const createText: RequestHandler<{}, any, TextBody> = async (req, res): Promise<void> => {
  try {
    const { content } = req.body;
    const user = req.user;
    const userId = user?.id;

    if (!content) {
      res.status(400).json({ status: false, error: 'Content is required' });
      return;
    }

    if (!userId) {
      res.status(401).json({ status: false, error: 'Unauthorized: User not found' });
      return;
    }

    const text = await TextModel.create(content, userId);

    res.status(201).json({ status: true, message: 'Successfully Created', data: text });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};

// Read
export const getText: RequestHandler<TextParams> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;
    const userId = user?.id;

    const text = await TextModel.findById(Number(id));

    if (!text) {
      res.status(404).json({ status: false, error: 'Text not found' });
      return;
    }

    // Type assertion to include userId property
    const textWithUser = text as typeof text & { userId: string | number };
    console.log({db_userId: textWithUser.userId, request_userId: userId});
    if (textWithUser.userId !== userId) {
      res.status(403).json({ status: false, error: `Forbidden: You don't have access to this text` });
      return;
    }

    res.json({ status: true, data: text });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};

// Update
export const updateText: RequestHandler<TextParams, any, TextBody> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;
    const userId = user?.id;

    if (!content) {
      res.status(400).json({ status: false, error: 'Content is required' });
      return;
    }

    const existingText = await TextModel.findById(Number(id));
    if (!existingText) {
      res.status(404).json({ status: false, error: 'Text not found' });
      return;
    }

    // Type assertion to include userId property
    const textWithUser = existingText as typeof existingText & { userId: string | number };

    if (textWithUser.userId !== userId) {
      res.status(403).json({ status: false, error: `Forbidden: You can't update this text` });
      return;
    }

    await TextModel.update(Number(id), content);
    res.json({ status: true, message: 'Successfully Updated' });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};

// Delete
export const deleteText: RequestHandler<TextParams> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;
    const userId = user?.id;

    const existingText = await TextModel.findById(Number(id));
    if (!existingText) {
      res.status(404).json({ status: false, error: 'Text not found' });
      return;
    }

    // Type assertion to include userId property
    const textWithUser = existingText as typeof existingText & { userId: string | number };

    if (textWithUser.userId !== userId) {
      res.status(403).json({ status: false, error: `Forbidden: You can't delete this text` });
      return;
    }

    await TextModel.delete(Number(id));
    res.status(202).json({ status: true, message: 'Successfully Deleted' });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};

// Analysis
export const getAnalysis: RequestHandler<TextParams> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user;
    const userId = user?.id;

    const text = await TextModel.findById(Number(id));

    if (!text) {
      res.status(404).json({ status: false, error: 'Text not found' });
      return;
    }

    // Type assertion to include userId property
    const textWithUser = text as typeof text & { userId: string | number };

    if (textWithUser.userId !== userId) {
      res.status(403).json({ status: false, error: `Forbidden: You can't analyze this text` });
      return;
    }

    const analysis = analyzeText(text.content);
    res.json({ status: true, data: analysis });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};
