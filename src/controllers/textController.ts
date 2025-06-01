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
    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }

    const text = await TextModel.create(content);
    res.status(201).json(text);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read
export const getText: RequestHandler<TextParams> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const text = await TextModel.findById(Number(id));
    if (!text) {
      res.status(404).json({ error: 'Text not found' });
      return;
    }
    res.json(text);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update
export const updateText: RequestHandler<TextParams, any, TextBody> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }

    const text = await TextModel.update(Number(id), content);
    if (!text) {
      res.status(404).json({ error: 'Text not found' });
      return;
    }

    res.json(text);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete
export const deleteText: RequestHandler<TextParams> = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await TextModel.delete(Number(id));
    if (!success) {
      res.status(404).json({ error: 'Text not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Analysis
export const getAnalysis: RequestHandler<TextParams> = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const text = await TextModel.findById(Number(id));
    if (!text) {
      res.status(404).json({ error: 'Text not found' });
      return;
    }

    const analysis = analyzeText(text.content);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
