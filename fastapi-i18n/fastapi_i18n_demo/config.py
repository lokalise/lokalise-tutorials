from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Configuration settings for the FastAPI i18n setup.
    """

    supported_locales: List[str] = ["en", "fr", "he"]  # Added "he"
    default_locale: str = "en"

    class Config:
        env_prefix = "APP_"


# Create a settings instance
settings = Settings()
